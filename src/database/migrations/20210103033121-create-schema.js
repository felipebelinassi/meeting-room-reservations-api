/* eslint-disable */
module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.createSchema('meeting'),
  down: (queryInterface, Sequelize) => queryInterface.dropSchema('meeting'),
};
