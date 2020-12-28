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
      url: envVars.DATABASE_URL,
    },
  };
};

export default loadConfig;
