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
      uri: envVars.DATABASE_URI,
      database: envVars.DATABASE_NAME,
      user: envVars.DATABASE_USER,
      password: envVars.DATABASE_PASSWORD,
      host: envVars.DATABASE_HOST,
      dialect: envVars.DATABASE_DIALECT,
      timezone: envVars.TIMEZONE,
    },
  };
};

export default loadConfig;
