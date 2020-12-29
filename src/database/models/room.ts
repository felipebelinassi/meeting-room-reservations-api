import { Model, Optional, DataTypes } from 'sequelize';
import db from './instance';

export interface RoomAttributes {
  roomId: string;
  description?: string;
  openAt: string;
  closeAt: string;
}

interface RoomCreationAttributes extends Optional<RoomAttributes, 'roomId'> {}

interface RoomInstance extends Model<RoomAttributes, RoomCreationAttributes> {}

const Room = db.sequelize.define<RoomInstance>('Room', {
  roomId: {
    type: DataTypes.UUID,
    field: 'employee_id',
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
});

export default Room;
