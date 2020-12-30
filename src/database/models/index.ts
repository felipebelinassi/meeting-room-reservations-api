import Employee from './employee';
import Room from './room';
import Reservation from './reservation';

const models = {
  Room,
  Employee,
  Reservation,
};

Object.values(models).map(model => {
  if (model.associate) model.associate(models);
  return models;
});

export default models;