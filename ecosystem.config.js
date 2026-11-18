const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

// PM2's `env_file` option turned out to not actually inject anything into
// the process environment on this VPS's PM2 version (6.0.14) — confirmed by
// inspecting /proc/<pid>/environ directly, which showed DATABASE_URL,
// GROQ_API_KEY, PIPELINE_API_KEY etc all genuinely absent from the running
// process despite being correctly set in .env (DB access still "worked"
// only because Prisma auto-loads .env internally on its own, independent
// of the parent process — anything read via plain process.env.X had no
// such fallback and was silently broken). Loading .env ourselves here,
// as plain Node code evaluated when PM2 reads this config file, sidesteps
// whatever PM2-version-specific env_file behavior caused that.
const dotenvPath = path.join(__dirname, ".env");
const parsedEnv = fs.existsSync(dotenvPath) ? dotenv.parse(fs.readFileSync(dotenvPath)) : {};

module.exports = {
  apps: [
    {
      name: "neoklyn-prod",
      script: "./.next/standalone/server.js",
      cwd: __dirname,
      // Next.js's generated standalone server.js is a plain http server, not
      // written to be cluster-safe — running multiple instances in PM2's
      // "cluster" exec_mode causes them to fight over the same port and
      // crash-loop ("Failed to start server"). A single fork instance is
      // reliable and plenty for this site's traffic.
      instances: 1,
      exec_mode: "fork",
      env: {
        ...parsedEnv,
        NODE_ENV: "production",
        // 3000 and 3002 were both already taken on this VPS (confirmed via
        // `sudo ss -tlnp`). 3001 was free. Re-check with that command if you
        // ever see EADDRINUSE again, and update the Nginx proxy_pass to match.
        PORT: 3001,
      },
      env_production: {
        NODE_ENV: "production",
      },
      error_file: "/var/log/neoklyn-error.log",
      out_file: "/var/log/neoklyn-out.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",
      merge_logs: true,
      autorestart: true,
      max_restarts: 10,
      min_uptime: "10s",
      max_memory_restart: "1G",
    },
  ],
};