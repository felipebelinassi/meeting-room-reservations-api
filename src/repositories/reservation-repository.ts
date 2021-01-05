import type { Logger } from 'pino';
import sequelize, { Op } from 'sequelize';
import type { Models } from '../database/models';
import { ReservationInstance } from '../database/models/reservation';
import checkRoomAvailability from './helpers/reservation-availability-conditions';

interface CreateReservationParams {
  roomId: string;
  userId: string;
  startTime: string;
  endTime: string;
}

interface GetReservationsParams {
  userId?: string;
  roomId?: string;
  date: string;
}

export interface ReservationRepository {
  create: (params: CreateReservationParams) => Promise<[ReservationInstance, boolean]>;
  get: (reservationId: string, userId: string) => Promise<ReservationInstance | null>;
  getReservations: (params: GetReservationsParams) => Promise<ReservationInstance[]>;
}

export default (logger: Logger, models: Models): ReservationRepository => {
  const create = async (params: CreateReservationParams) => {
    logger.info('Create a reservation for a room on a given timespan');
    return models.Reservation.findOrCreate({
      where: {
        [Op.or]: [{ roomId: params.roomId }, { reservedBy: params.userId }],
        [Op.and]: {
          ...checkRoomAvailability(params.startTime, params.endTime),
        },
      },
      defaults: {
        roomId: params.roomId,
        reservedBy: params.userId,
        startAt: params.startTime,
        endAt: params.endTime,
      },
      raw: true,
    });
  };

  const get = async (reservationId: string, userId: string) => {
    logger.info('Get a single user reservation');
    return models.Reservation.findOne({
      where: {
        reservedBy: userId,
        reservationId,
      },
    });
  };

  const getReservations = async (params: GetReservationsParams) => {
    logger.info('Get list of reservations by date, userId or roomId');
    const { userId, roomId, date } = params;

    const whereParams = {} as Record<string, string>;
    // Dynamically set where criteria
    if (userId) whereParams.reservedBy = userId;
    else if (roomId) whereParams.roomId = roomId;

    return models.Reservation.findAll({
      where: {
        ...whereParams,
        [Op.and]: [
          sequelize.where(sequelize.fn('date', sequelize.col('start_at')), '=', date),
          sequelize.where(sequelize.fn('date', sequelize.col('end_at')), '=', date),
        ],
      },
      include: [
        {
          model: models.User,
          as: 'user',
          attributes: ['firstName'],
        },
        {
          model: models.Room,
          as: 'room',
          attributes: ['description'],
        },
      ],
      order: [['startAt', 'asc']],
    });
  };

  return {
    create,
    get,
    getReservations,
  };
};
