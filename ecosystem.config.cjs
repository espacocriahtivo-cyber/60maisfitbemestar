// Configuração do PM2 para implantação em VPS ou Node.js na Hostinger
module.exports = {
  apps: [
    {
      name: '60plus-fit',
      script: 'node_modules/.bin/tsx',
      args: 'server.ts',
      instances: 'max',
      exec_mode: 'cluster',
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
    },
  ],
};
