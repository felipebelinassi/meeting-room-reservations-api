import type { Logger } from 'pino';
import sequelize, { Op } from 'sequelize';
import models from '../database/models';
import { ReservationInstance } from '../database/models/reservation';
import checkRoomAvailability from './helpers/reservation-availability-conditions';
import { validateDateRange } from '../utils/date-time';

const { Reservation, User, Room } = models;

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
  cancel: (reservationId: string, userId: string) => Promise<void | null>;
  getReservations: (params: GetReservationsParams) => Promise<ReservationInstance[]>;
}

export default (logger: Logger): ReservationRepository => {
  const create = async (params: CreateReservationParams) => {
    logger.info('Create a reservation for a room on a given timespan');
    const reservation = await Reservation.findOrCreate({
      where: {
        [Op.or]: [
          { roomId: params.roomId },
          { reservedBy: params.userId },
        ],
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

    return reservation;
  };

  const cancel = async (reservationId: string, userId: string) => {
    logger.info('Cancel reservation');
    const reservation = await Reservation.findOne({
      where: {
        reservedBy: userId,
        reservationId,
      },
    });

    if (reservation && !validateDateRange(reservation.startAt, new Date().toString())) {
      throw new Error('Cannot cancel a current reservation');
    }
  
    return reservation?.destroy();
  };

  const getReservations = async (params: GetReservationsParams) => {
    logger.info('Get list of reservations by date, userId or roomId');
    const { userId, roomId, date } = params;

    const whereParams = {} as Record<string, string>;
    // Dynamically set where criteria
    if (userId) whereParams.reservedBy = userId;
    else if (roomId) whereParams.roomId = roomId;

    const reservations = await Reservation.findAll({
      where: {
        ...whereParams,
        [Op.and]: [
          sequelize.where(sequelize.fn('date', sequelize.col('start_at')), '=', date),
          sequelize.where(sequelize.fn('date', sequelize.col('end_at')), '=', date),
        ],
      },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['firstName'],
        },
        { 
          model: Room,
          as: 'room',
          attributes: ['description'],
        },
      ],
      order: [['startAt', 'asc']],
    });
    return reservations;
  };
  

  return {
    create,
    cancel,
    getReservations,
  };
};
