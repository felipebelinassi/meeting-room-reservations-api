import User from './user';
import Room from './room';
import Reservation from './reservation';

const models = {
  Room,
  User,
  Reservation,
};

Object.values(models).map(model => {
  if (model.prototype.associate) model.prototype.associate(models);
  return models;
});

export default models;