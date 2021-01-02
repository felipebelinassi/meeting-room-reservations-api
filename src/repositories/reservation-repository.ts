import type { Logger } from 'pino';
import { Op } from 'sequelize';
import models from '../database/models';
import checkRoomAvailability from './helpers/reservation-availability-conditions';

const { Reservation } = models;

interface CreateReservationParams {
  roomId: string;
  userId: string;
  startTime: string;
  endTime: string;
}

export interface ReservationRepository {
  create: (params: CreateReservationParams) => Promise<[ReservationAttributes, boolean]>;
  cancel: (reservationId: string, userId: string) => Promise<void | null>;
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
  
    return reservation?.destroy();
  };

  return {
    create,
    cancel,
  };
};
