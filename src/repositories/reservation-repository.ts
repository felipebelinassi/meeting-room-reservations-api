import type { Logger } from 'pino';
import { Op } from 'sequelize';
import models from '../database/models';

const { Reservation } = models;

interface CreateReservationParams {
  roomId: string;
  employeeId: string;
  startTime: string;
  endTime: string;
}

export interface ReservationRepository {
  create: (params: CreateReservationParams) => Promise<[ReservationAttributes, boolean]>;
  cancel: (reservationId: string, employeeId: string) => Promise<void | null>;
}

export default (logger: Logger): ReservationRepository => {
  const create = async (params: CreateReservationParams) => {
    logger.info('Reservate a room for a given span of time');
    const reservation = await Reservation.findOrCreate({
      where: {
        [Op.or]: [
          {
            startAt: { [Op.gt]: params.startTime },
            endAt: { [Op.lt]: params.endTime },
          },
          {
            startAt: { [Op.lt]: params.startTime },
            endAt: { [Op.gt]: params.endTime },
          },
          {
            startAt: { 
              [Op.and]: {
                [Op.gte]: params.startTime,
                [Op.lt]: params.endTime, 
              },
            },
          },
          {
            endAt: { 
              [Op.and]: {
                [Op.gt]: params.startTime,
                [Op.lte]: params.endTime, 
              },
            },
          },
        ],
      },
      defaults: {
        roomId: params.roomId,
        reservedBy: params.employeeId,
        startAt: params.startTime,
        endAt: params.endTime,
      },
      raw: true,
    });

    return reservation;
  };

  const cancel = async (reservationId: string, employeeId: string) => {
    logger.info('Cancel reservation');
    const reservation = await Reservation.findOne({
      where: {
        reservedBy: employeeId,
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
