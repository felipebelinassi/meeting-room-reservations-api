import joi from 'joi';

export default joi
  .object({
    NODE_ENV: joi.string().lowercase().valid('local', 'test', 'development', 'production'),
    PORT: joi.string().required(),
    DB_USERNAME: joi.string().required(),
    DB_PASSWORD: joi.string().required(),
    DB_HOST: joi.string().required(),
    DB_NAME: joi.string().required(),
    DB_PORT: joi.string().required(),
    DB_DIALECT: joi.string().required(),
    TIMEZONE: joi.string().required(),
    LOGGER_ENABLED: joi.string().default('true').required(),
    LOGGER_LEVEL: joi.string().lowercase().valid('info', 'warn', 'error', 'debug', 'silly'),
    JWT_SECRET_KEY: joi.string().required(),
    TOKEN_EXPIRES_IN: joi.string().required(),
  })
  .unknown();
