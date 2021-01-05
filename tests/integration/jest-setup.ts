import { Server } from 'http';
import supertest from 'supertest';
import { app } from '../../src/app';
import db from '../../src/database';
import createModels from '../../src/database/models';

jest.mock('../../src/logger');

let server: Server;
beforeAll(async () => {
  // Instantiate models to sync them correctly
  createModels(db.sequelize);
  await db.sequelize.sync();

  server = app.listen(4000);
  global.testRequest = supertest(server);
});

afterAll(async () => {
  await db.sequelize.drop();
  await db.sequelize.close();
  server.close();
});