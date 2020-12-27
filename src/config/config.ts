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
    envs: envVars.NODE_ENV,
    port: envVars.PORT,
    application: {
      name, 
      version,
    },
    database: {
      name: envVars.DB_NAME,
      dialect: envVars.DB_DIALECT,
      host: envVars.DB_URL,
      port: envVars.DB_PORT,
      username: envVars.DB_USERNAME,
      password: envVars.DB_PASSWORD,
      database: envVars.DATABASE_NAME,
      pool: {
        min: Number(envVars.DB_MIN_POOL),
        max: Number(envVars.DB_MAX_POOL),
        idle: Number(envVars.DB_IDLE_TIME),
      },
      timezone: envVars.TIMEZONE,
    },
  };
};

export default loadConfig;
