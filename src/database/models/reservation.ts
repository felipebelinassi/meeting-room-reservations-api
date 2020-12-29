import { Model, Optional, DataTypes } from 'sequelize';
import { CustomModel } from './types';
import db from './instance';

export interface ReservationAttributes {
  reservationId: string;
  roomId: string;
  reservedBy: string;
  startAt: string;
  endAt: string;
}

interface ReservationCreationAttributes extends Optional<ReservationAttributes, 'reservationId'> {}

interface ReservationInstance extends Model<ReservationAttributes, ReservationCreationAttributes>, ReservationAttributes {}

const Reservation: CustomModel<ReservationInstance> = db.sequelize.define('Reservation', {
  reservationId: {
    type: DataTypes.UUID,
    field: 'reservation_id',
    primaryKey: true,
  },
  roomId: {
    type: DataTypes.UUID,
    field: 'room_id',
  },
  reservedBy: {
    type: DataTypes.UUID,
    field: 'reserved_by',
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

Reservation.associate = (models) => {
  Reservation.hasOne(models.Room, { sourceKey: 'roomId' });
};

export default Reservation;
