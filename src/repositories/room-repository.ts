import type { Logger } from 'pino';
import sequelize, { Op } from 'sequelize';
import Reservation from '../database/models/reservation';
import Room from '../database/models/room';

export interface RoomRepository {
  getAvailable: (startHour: string, endHour: string, startTime: string, endTime: string) => Promise<RoomAttributes[]>;
}

export default (logger: Logger): RoomRepository => {
  const getAvailable = async (startHour: string, endHour: string, startTime: string, endTime: string) => {
    logger.info('Get list of available rooms at given period');
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
  
    const availableRooms = await Room.findAll({
      where: {
        openAt: { [Op.lte]: startHour },
        closeAt: { [Op.gte]: endHour },
        [Op.and]: sequelize.literal('"roomReservations" IS NULL'),
      },
      include: [
        {
          model: Reservation,
          required: false,
          as: 'roomReservations',
          where: {
            [Op.or]: [
              containsRequestedPeriod,
              isContainedInRequestedPeriod,
              startIsBetweenRequestedPeriod,
              endIsBetweenRequestedPeriod,
            ],
          },
        },
      ],
    });

    logger.info(`Found ${availableRooms.length} rooms available for the desired period`);

    return availableRooms;
  };


  return {
    getAvailable,
  };
};