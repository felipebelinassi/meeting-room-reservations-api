import { Sequelize } from 'sequelize';
import config from '../../config';

const { uri, dialect, timezone } = config.database;

const sequelize = new Sequelize(uri, { dialect, timezone, logging: console.log });

const db = {
  sequelize,
  Sequelize,
};

export default db;