import joi from 'joi';
import getConfig from '../../../src/config/config';

const schemaMock = joi
  .object({
    NODE_ENV: joi.string().lowercase().valid('local', 'test', 'development', 'production').required(),
    PORT: joi.string().required(),
    APPLICATION_NAME: joi.string().required(),
    APPLICATION_VERSION: joi.string().required(),
  })
  .unknown()
  .required();

describe('Config unit tests', () => {
  describe('Success scenarios', () => {
    it('should return a valid config object', () => {
      const mockEnvironments = {
        NODE_ENV: 'development',
        PORT: '8082',
        APPLICATION_NAME: 'meeting-room-reservations-api',
        APPLICATION_VERSION: '1.0.0',
      };

      const config = getConfig(schemaMock, mockEnvironments);
      expect(typeof config).toBe('object');
      expect(config).toHaveProperty('env', mockEnvironments.NODE_ENV);
      expect(config).toHaveProperty('env', mockEnvironments.NODE_ENV);
      expect(config).toHaveProperty('application.name', mockEnvironments.APPLICATION_NAME);
      expect(config).toHaveProperty('application.version', mockEnvironments.APPLICATION_VERSION);
    });
  });

  describe('Error scenarios', () => {
    it('should throw error when required values are missing', () => {
      const mockEnvironments = {
        NODE_ENV: 'development',
        APPLICATION_NAME: 'civ-authorizer-api',
        APPLICATION_VERSION: '0.0.1',
      };

      expect(() => getConfig(schemaMock, mockEnvironments)).toThrow(
        'Environment variables validation error: "PORT" is required',
      );
    });

    it('should throw error when required values are missing', () => {
      const mockEnvironments = {
        NODE_ENV: 'homologation',
        PORT: '8082',
        APPLICATION_NAME: 'civ-authorizer-api',
        APPLICATION_VERSION: '0.0.1',
      };

      expect(() => getConfig(schemaMock, mockEnvironments)).toThrow(
        'Environment variables validation error: "NODE_ENV" must be one of [local, test, development, production]',
      );
    });
  });
});



