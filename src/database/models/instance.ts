import { Sequelize } from 'sequelize';
import config from '../../config';

const { database, username, password, ...dbConfig } = config.database;

const sequelize = new Sequelize(
  database, username, password, { ...dbConfig, logging: false },
);

const db = {
  sequelize,
  Sequelize,
};

export default db;