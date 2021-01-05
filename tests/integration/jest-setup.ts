import supertest from 'supertest';
import { app } from '../../src/app';
import db from '../../src/database';
import createModels from '../../src/database/models';

jest.mock('../../src/logger');

beforeAll(async () => {
  // Instantiate models to sync them correctly
  createModels(db.sequelize);
  await db.sequelize.sync();

  global.testRequest = supertest(app);
});

afterAll(async () => {
  await db.sequelize.drop();
  await db.sequelize.close();
});