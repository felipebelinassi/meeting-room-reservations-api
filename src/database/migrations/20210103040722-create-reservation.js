/* eslint-disable */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('reservation', {
      reservation_id: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
        primaryKey: true,
      },
      room_id: {
        type: Sequelize.DataTypes.UUID,
        references: {
          model: {
            tableName: 'room',
          },
          key: 'room_id'
        },
      },
      reserved_by: {
        type: Sequelize.DataTypes.UUID,
        references: {
          model: {
            tableName: 'user',
          },
          key: 'user_id'
        }
      },
      start_at: {
        type: Sequelize.DataTypes.DATE,
      },
      end_at: {
        type: Sequelize.DataTypes.DATE,
      }
    });

    await queryInterface.addConstraint('reservation', {
      type: 'unique',
      fields: ['reservation_id', 'start_at', 'end_at'],
      name: 'reservation_un',
    });
  },
  down: (queryInterface, Sequelize) => queryInterface.dropTable('reservation'),
};
