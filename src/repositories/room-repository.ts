import type { Logger } from 'pino';
import sequelize, { Op } from 'sequelize';
import Reservation from '../database/models/reservation';
import Room from '../database/models/room';
import checkRoomAvailability from './helpers/reservation-availability-conditions';

interface AvailableRoomParams {
  from: string;
  to: string;
  startHour: string;
  endHour: string;
}
export interface RoomRepository {
  getAvailable: (params: AvailableRoomParams) => Promise<RoomAttributes[]>;
}

export default (logger: Logger): RoomRepository => {
  const getAvailable = async (params: AvailableRoomParams) => {
    logger.info('Search available rooms at given timespan');
    const availableRooms = await Room.findAll({
      where: {
        openAt: { [Op.lte]: params.startHour },
        closeAt: { [Op.gte]: params.endHour },
        [Op.and]: sequelize.literal('"roomReservations" IS NULL'),
      },
      include: [
        {
          model: Reservation,
          required: false,
          as: 'roomReservations',
          where: checkRoomAvailability(params.from, params.to),
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