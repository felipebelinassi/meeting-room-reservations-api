import { Sequelize, Model, Optional, DataTypes, ModelCtor } from 'sequelize';

interface RoomCreationAttributes extends Optional<RoomAttributes, 'roomId'> {}

export interface RoomInstance
  extends Model<RoomAttributes, RoomCreationAttributes>,
  RoomAttributes {}

export type RoomModel = ModelCtor<RoomInstance>;


export default (sequelize: Sequelize): RoomModel => {
  const Room = sequelize.define<RoomInstance>('Room', {
    roomId: {
      type: DataTypes.UUIDV4,
      field: 'room_id',
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    description: {
      type: DataTypes.STRING,
    },
    openAt: {
      type: DataTypes.TIME,
      field: 'open_at',
    },
    closeAt: {
      type: DataTypes.TIME,
      field: 'close_at',
    },
  }, {
    createdAt: false,
    updatedAt: false,
    tableName: 'room',
    schema: 'meeting',
  });

  Room.prototype.associate = (models: Record<string, ModelCtor<any>>) => {
    Room.hasMany(models.Reservation, {
      sourceKey: 'roomId',
      foreignKey: 'roomId',
      as: 'roomReservations',
    });
  };

  return Room;
};
