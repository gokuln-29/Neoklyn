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
      // Loads DATABASE_URL, NEXTAUTH_SECRET, GROQ_API_KEY, SMTP_*, CLOUDINARY_*, etc.
      // from the project's .env file into the process environment. Without this,
      // the standalone server.js (which does NOT read .env on its own) starts with
      // none of those variables set, breaking auth, the database, email, and AI.
      env_file: ".env",
      env: {
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