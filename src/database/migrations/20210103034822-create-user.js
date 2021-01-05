/* eslint-disable */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user', {
      user_id: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
        primaryKey: true,
      },
      first_name: {
        type: Sequelize.DataTypes.STRING,
      },
      last_name: {
        type: Sequelize.DataTypes.STRING,
      },
      username: {
        type: Sequelize.DataTypes.STRING,
        unique: true,
      },
      email: {
        type: Sequelize.DataTypes.STRING,
        unique: true,
      },
      password: {
        type: Sequelize.DataTypes.STRING,
      },
      created_at:{
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.fn('now'),
      },
      updated_at: {
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.fn('now'),
      },
    });
  },
  down: (queryInterface, Sequelize) => queryInterface.dropTable('user'),
};
