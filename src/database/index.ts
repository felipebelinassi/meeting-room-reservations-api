import { Sequelize, Dialect } from 'sequelize';
import roomFactory from './models/room';

interface DatabaseConfig {
  uri: string;
  dialect: Dialect;
  timezone: string;
}

const initConnection = (config: DatabaseConfig) => {
  const { uri, dialect, timezone } = config;
  const sequelize = new Sequelize(uri, { dialect, timezone });

  return {
    sequelize,
    Sequelize,
    models: {
      Room: roomFactory(sequelize),
    },
  };
};

export default initConnection; 