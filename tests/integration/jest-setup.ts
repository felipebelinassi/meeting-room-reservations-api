import db from '../../src/database/models/instance';
import createModels from '../../src/database/models';

beforeAll(async () => {
  // Instantiate models to sync them correctly
  createModels(db.sequelize);
  await db.sequelize.sync();
});

afterAll(async () => {
  await db.sequelize.drop();
});