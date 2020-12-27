import { Sequelize, Dialect } from 'sequelize';
import employeeFactory from './models/employee';

interface DatabaseConfig {
  database: string;
  host: string;
  username: string;
  password: string;
  dialect: Dialect,
  pool: {
    max: number,
    min: number,
    idle: number,
  }
}

const initConnection = (config: DatabaseConfig) => {
  const { host, username, password, database, pool, dialect } = config;
  const sequelize = new Sequelize(host, username, password, {
    database, pool, dialect,
  });

  console.log('Connecting to PostgreSQL database');

  return {
    sequelize,
    Sequelize,
    models: {
      Employee: employeeFactory(sequelize),
    },
  };
};

export default initConnection;