import { Model, Optional, DataTypes } from 'sequelize';
import db from './instance';
import Reservation from './reservation';

interface RoomCreationAttributes extends Optional<RoomAttributes, 'roomId'> {}

export interface RoomInstance
  extends Model<RoomAttributes, RoomCreationAttributes>,
  RoomAttributes {}

const Room = db.sequelize.define<RoomInstance>('Room', {
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

Room.hasMany(Reservation, {
  sourceKey: 'roomId',
  foreignKey: 'roomId',
  as: 'roomReservations',
});

export default Room;
