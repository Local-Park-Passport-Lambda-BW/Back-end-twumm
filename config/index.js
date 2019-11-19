const env = process.env.NODE_ENV || 'development';
const isProduction = env === 'production';

module.exports = {
  env,
  pgdburl: process.env.DATABASE_URL_PRODUCTION,
  secure: isProduction,
};
