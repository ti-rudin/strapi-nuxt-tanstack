// Load environment variables from .env file
require('dotenv').config();

module.exports = {
  apps: [
    {
      name: 'nuxt-frontend-dev',
      cwd: './nuxt-frontend',
      script: 'npm',
      args: 'run dev',
      exec_mode: 'fork',
      instances: 1,
      env: {
        NODE_ENV: 'development',
        PORT: process.env.NUXT_PORT || 3000,
        STRAPI_URL: process.env.STRAPI_URL || 'http://localhost:1337',
        STRAPI_TOKEN: process.env.STRAPI_TOKEN || '',
        ...process.env
      }
    },
    {
      name: 'strapi-server-dev',
      cwd: './server',
      script: 'npm',
      args: 'run develop',
      env: {
        NODE_ENV: 'development',
        HOST: process.env.HOST || '0.0.0.0',
        PORT: process.env.STRAPI_PORT || 1337,
        APP_KEYS: process.env.APP_KEYS,
        API_TOKEN_SALT: process.env.API_TOKEN_SALT,
        ADMIN_JWT_SECRET: process.env.ADMIN_JWT_SECRET,
        TRANSFER_TOKEN_SALT: process.env.TRANSFER_TOKEN_SALT,
        ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
        JWT_SECRET: process.env.JWT_SECRET,
        DATABASE_CLIENT: process.env.DATABASE_CLIENT || 'sqlite',
        DATABASE_HOST: process.env.DATABASE_HOST,
        DATABASE_PORT: process.env.DATABASE_PORT,
        DATABASE_NAME: process.env.DATABASE_NAME,
        DATABASE_USERNAME: process.env.DATABASE_USERNAME,
        DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
        DATABASE_SSL: process.env.DATABASE_SSL,
        DATABASE_FILENAME: process.env.DATABASE_FILENAME || '.tmp/data.db',
        ...process.env
      }
    }
  ]
};

