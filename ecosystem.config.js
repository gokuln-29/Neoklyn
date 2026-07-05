module.exports = {
  apps: [
    {
      name: "neoklyn-prod",
      script: "./.next/standalone/server.js",
      cwd: __dirname,
      instances: "max",
      exec_mode: "cluster",
      // Loads DATABASE_URL, NEXTAUTH_SECRET, GROQ_API_KEY, SMTP_*, CLOUDINARY_*, etc.
      // from the project's .env file into the process environment. Without this,
      // the standalone server.js (which does NOT read .env on its own) starts with
      // none of those variables set, breaking auth, the database, email, and AI.
      env_file: ".env",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
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