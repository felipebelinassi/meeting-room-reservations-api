import { Model, Optional, DataTypes } from 'sequelize';
import db from './instance';
import { formatDateTime } from '../../utils/date-time';

interface ReservationCreationAttributes extends Optional<ReservationAttributes, 'reservationId'> {}

export interface ReservationInstance
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
    get() {
      return formatDateTime(this.getDataValue('startAt')).time;
    },
  },
  endAt: {
    type: DataTypes.DATE,
    field: 'end_at',
    get() {
      return formatDateTime(this.getDataValue('endAt')).time;
    },
  },
}, {
  createdAt: false,
  updatedAt: false,
  tableName: 'reservation',
  schema: 'meeting',
});

export default Reservation;
