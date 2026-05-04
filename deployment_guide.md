# NeoKlyn VPS Deployment Guide

This guide covers deploying NeoKlyn on a Hostinger VPS using PM2 and optional Nginx reverse proxy.

## Prerequisites

- Hostinger VPS with root access
- Node.js 18+ installed
- Domain pointing to your VPS IP

## Step 1: Server Setup

### 1.1 Connect to your VPS

```bash
ssh root@your-vps-ip
```

### 1.2 Update system and install dependencies

```bash
apt update && apt upgrade -y
apt install -y curl git nginx
```

### 1.3 Install Node.js 20 LTS

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs
node -v  # Verify Node.js version
```

### 1.4 Install PM2 globally

```bash
npm install -g pm2
pm2 --version
```

## Step 2: Deploy Application

### 2.1 Clone the repository

```bash
cd /var/www
git clone https://github.com/your-repo/neoklyn.git
cd neoklyn
```

### 2.2 Install dependencies (including sharp)

```bash
npm install
```

### 2.3 Set up environment variables

Create a `.env.local` file in the project root:

```bash
cp .env.local.example .env.local
# Edit with your actual values
nano .env.local
```

Required variables:
- `OPENAI_API_KEY`
- `ANTHROPIC_API_KEY`
- `GOOGLE_GENERATIVE_AI_API_KEY`
- `RESEND_API_KEY`
- `EMAIL_USER` / `EMAIL_PASSWORD`
- `NEXT_PUBLIC_GA_ID`

### 2.4 Build the application

```bash
npm run build
```

This generates the standalone build in `.next/standalone/`.

### 2.5 Start with PM2

```bash
pm2 start ecosystem.config.js
pm2 save
```

To auto-start on reboot:

```bash
pm2 startup
# Follow the output instructions
```

## Step 3: Configure Nginx (Recommended)

### 3.1 Create Nginx config

```bash
nano /etc/nginx/sites-available/neoklyn
```

Add the following:

```nginx
server {
    listen 80;
    server_name neoklyn.com www.neoklyn.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 60s;
        proxy_connect_timeout 60s;
    }
}
```

### 3.2 Enable the site

```bash
ln -s /etc/nginx/sites-available/neoklyn /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
```

## Step 4: SSL Certificate (Recommended)

### Install Certbot

```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d neoklyn.com -d www.neoklyn.com
```

Follow the prompts to configure HTTPS.

## Step 5: Verify Deployment

```bash
# Check PM2 status
pm2 status
pm2 logs neoklyn-prod --lines 50

# Test the application
curl -I http://localhost:3000
```

## Common Commands

```bash
# Restart the application
pm2 restart neoklyn-prod

# View logs
pm2 logs neoklyn-prod

# Monitor performance
pm2 monit

# Reload without downtime
pm2 reload neoklyn-prod

# Stop the application
pm2 stop neoklyn-prod
```

## Troubleshooting

### Build fails with sharp
```bash
npm rebuild sharp
```

### Port already in use
```bash
lsof -i :3000
pm2 delete all
```

### Memory issues
```bash
# Check memory usage
free -h
# Add swap if needed
```

## Performance Tips

1. **Use PM2 cluster mode** - Already configured in `ecosystem.config.js`
2. **Enable gzip compression** - Already handled by Next.js
3. **Use CDN for static assets** - Consider Cloudflare for free CDN
4. **Monitor with PM2** - Run `pm2 monit` for real-time metrics