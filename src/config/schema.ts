import joi from 'joi';

export default joi.object({
  NODE_ENV: joi.string().lowercase().valid('local', 'test', 'development', 'production'),
  PORT: joi.string().required(),
  DB_NAME: joi.string().required(),
  DB_DIALECT: joi.string().required(),
  DB_URL: joi.string().required(),
  DB_PORT: joi.string().required(),
  DB_USERNAME: joi.string().required(),
  DB_PASSWORD: joi.string().required(),
  DATABASE_NAME: joi.string().required(),
  DB_MIN_POOL: joi.string().required(),
  DB_MAX_POOL: joi.string().required(),
  DB_IDLE_TIME: joi.string().required(),
  TIMEZONE: joi.string().required(),
}).unknown();