import { Sequelize, Model, Optional, DataTypes, ModelCtor } from 'sequelize';
import { formatTime } from '../../utils/date-time';

interface ReservationCreationAttributes extends Optional<ReservationAttributes, 'reservationId'> {}

export interface ReservationInstance
  extends Model<ReservationAttributes, ReservationCreationAttributes>,
  ReservationAttributes {}

export type ReservationModel = ModelCtor<ReservationInstance>;

export default (sequelize: Sequelize): ReservationModel => {
  const Reservation = sequelize.define<ReservationInstance>('Reservation', {
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
        return formatTime(this.getDataValue('startAt'));
      },
    },
    endAt: {
      type: DataTypes.DATE,
      field: 'end_at',
      get() {
        return formatTime(this.getDataValue('endAt'));
      },
    },
  }, {
    createdAt: false,
    updatedAt: false,
    tableName: 'reservation',
    schema: 'meeting',
  });

  Reservation.prototype.associate = (models: Record<string, ModelCtor<any>>) => {
    Reservation.belongsTo(models.User, {
      foreignKey: 'reservedBy',
      as: 'user',
    });
  
    Reservation.belongsTo(models.Room, {
      foreignKey: 'roomId',
      as: 'room',
    });
  };

  return Reservation;
};
