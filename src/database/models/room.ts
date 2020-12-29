import { Model, Optional, DataTypes, Sequelize } from 'sequelize';

export interface RoomAttributes {
  roomId: string;
  description?: string;
  openAt: string;
  closeAt: string;
}

interface RoomCreationAttributes extends Optional<RoomAttributes, 'roomId'> {}

interface RoomInstance extends Model<RoomAttributes, RoomCreationAttributes> {}

export default (sequelize: Sequelize) => sequelize.define<RoomInstance>('Room', {
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
  tableName: 'employee',
});