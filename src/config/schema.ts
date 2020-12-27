import joi from 'joi';

export default joi.object({
  NODE_ENV: joi.string().lowercase().valid('local', 'test', 'development', 'production'),
  PORT: joi.string().required(),
  DATABASE_URL: joi.string().required(),
  LOGGER_ENABLED: joi.string().default('true'),
  LOGGER_LEVEL: joi.string().lowercase().valid('info', 'warn', 'error', 'debug', 'silly'),
}).unknown();