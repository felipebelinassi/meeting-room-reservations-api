import { Model, Optional, DataTypes } from 'sequelize';
import { CustomModel } from './types';
import db from './instance';

export interface RoomAttributes {
  roomId: string;
  description?: string;
  openAt: string;
  closeAt: string;
}

interface RoomCreationAttributes extends Optional<RoomAttributes, 'roomId'> {}

interface RoomInstance extends Model<RoomAttributes, RoomCreationAttributes>, RoomAttributes {}

const Room: CustomModel<RoomInstance> = db.sequelize.define('Room', {
  roomId: {
    type: DataTypes.UUID,
    field: 'room_id',
    primaryKey: true,
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

Room.associate = (models) => {
  Room.hasMany(models.Reservation, { 
    sourceKey: 'roomId',
    foreignKey: 'roomId',
    as: 'roomReservations',
  });
};

export default Room;
