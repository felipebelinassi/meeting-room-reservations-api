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
    const { startTime, endTime } = params;

    const containsRequestedPeriod = {
      startAt: { [Op.gt]: startTime },
      endAt: { [Op.lt]: endTime },
    };

    const isContainedInRequestedPeriod = {
      startAt: { [Op.lt]: startTime },
      endAt: { [Op.gt]: endTime },
    };

    const startIsBetweenRequestedPeriod = {
      startAt: { 
        [Op.and]: {
          [Op.gte]: startTime,
          [Op.lt]: endTime, 
        },
      },
    };

    const endIsBetweenRequestedPeriod = {
      endAt: { 
        [Op.and]: {
          [Op.gt]: startTime,
          [Op.lte]: endTime, 
        },
      },
    };
  
    const reservation = await Reservation.findOrCreate({
      where: {
        [Op.or]: [
          {
            roomId: params.roomId,
          },
          {
            reservedBy: params.employeeId,
          },
        ],
        [Op.and]: {
          [Op.or]: [
            containsRequestedPeriod,
            isContainedInRequestedPeriod,
            startIsBetweenRequestedPeriod,
            endIsBetweenRequestedPeriod,
          ],
        },
      },
      defaults: {
        roomId: params.roomId,
        reservedBy: params.employeeId,
        startAt: startTime,
        endAt: endTime,
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
