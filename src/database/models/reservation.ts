import { Model, Optional, DataTypes } from 'sequelize';
import db from './instance';

interface ReservationCreationAttributes extends Optional<ReservationAttributes, 'reservationId'> {}

interface ReservationInstance
  extends Model<ReservationAttributes, ReservationCreationAttributes>,
  ReservationAttributes {}

const Reservation = db.sequelize.define<ReservationInstance>('Reservation', {
  reservationId: {
    type: DataTypes.UUIDV4,
    field: 'reservation_id',
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  roomId: {
    type: DataTypes.UUIDV4,
    field: 'room_id',
    defaultValue: DataTypes.UUIDV4,
  },
  reservedBy: {
    type: DataTypes.UUIDV4,
    field: 'reserved_by',
    defaultValue: DataTypes.UUIDV4,
  },
  startAt: {
    type: DataTypes.DATE,
    field: 'start_at',
  },
  endAt: {
    type: DataTypes.DATE,
    field: 'end_at',
  },
}, {
  createdAt: false,
  updatedAt: false,
  tableName: 'reservation',
  schema: 'meeting',
});

export default Reservation;
