/* eslint-disable */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('room', {
      room_id: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
        primaryKey: true,
      },
      description: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      open_at: {
        type: Sequelize.DataTypes.TIME,
      },
      close_at: {
        type: Sequelize.DataTypes.TIME,
      },
    });
  },
  down: (queryInterface, Sequelize) => queryInterface.dropTable('room'),
};
