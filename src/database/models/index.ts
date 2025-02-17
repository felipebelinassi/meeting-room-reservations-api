import userFactory from './user';
import roomFactory from './room';
import reservationFactory from './reservation';
import instance from '../index';

export default function createModels(db = instance.sequelize) {
  const models = {
    User: userFactory(db),
    Room: roomFactory(db),
    Reservation: reservationFactory(db),
  };

  Object.values(models).map((model) => {
    if (model.prototype.associate) model.prototype.associate(models);
    return models;
  });

  return models;
}

export type Models = ReturnType<typeof createModels>;
