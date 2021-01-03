/* eslint-disable */
const { v4: uuidV4 } = require('uuid');

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert({
    tableName: 'room', schema: 'meeting'
  }, [{
      room_id: uuidV4(),
      description: 'Meeting Room 1',
      open_at: '08:00:00',
      close_at: '17:00:00',
    },
    {
      room_id: uuidV4(),
      description: 'Meeting Room 2',
      open_at: '09:00:00',
      close_at: '18:00:00',
    },
    {
      room_id: uuidV4(),
      description: 'Meeting Room 3',
      open_at: '14:00:00',
      close_at: '20:00:00',
    }],
  ),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete({
    tableName: 'room', schema: 'meeting'
  }, null, {}),
};