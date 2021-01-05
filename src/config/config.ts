import Joi from 'joi';
import { name, version } from '../../package.json';

const loadConfig = (schema: Joi.ObjectSchema, envs: NodeJS.ProcessEnv) => {
  const { error, value: envVars } = schema.validate(envs, {
    abortEarly: true,
  });

  if (error) {
    throw new Error(`Environment variables validation error: ${error.message}`);
  }

  return {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    application: {
      name,
      version,
    },
    logger: {
      enabled: envVars.LOGGER_ENABLED,
      level: envVars.LOGGER_LEVEL,
    },
    database: {
      host: envVars.DB_HOST,
      database: envVars.DB_NAME,
      port: envVars.DB_PORT,
      username: envVars.DB_USERNAME,
      password: envVars.DB_PASSWORD,
      dialect: envVars.DB_DIALECT,
      timezone: envVars.TIMEZONE,
      logging: envVars.DB_LOGGING === 'true',
    },
    auth: {
      secret: envVars.JWT_SECRET_KEY,
      expiresIn: envVars.TOKEN_EXPIRES_IN,
    },
  };
};

export default loadConfig;
