module.exports = {
  apps: [
    {
      name: "neoklyn-prod",
      script: "./.next/standalone/server.js",
      instances: "max",
      exec_mode: "cluster",
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