import type { Logger } from 'pino';
import sequelize, { Op } from 'sequelize';
import models from '../database/models';
import { RoomInstance } from '../database/models/room';
import checkRoomAvailability from './helpers/reservation-availability-conditions';

const { Room, Reservation } = models;
interface AvailableRoomParams {
  from: string;
  to: string;
  startHour: string;
  endHour: string;
}
export interface RoomRepository {
  getRooms: () => Promise<RoomInstance[]>;
  getAvailable: (params: AvailableRoomParams) => Promise<RoomInstance[]>;
  isRoomOpen: (roomId: string, startHour: string, endHour: string) => Promise<boolean>;
}

export default (logger: Logger): RoomRepository => {
  const getRooms = async () => {
    logger.info('Get list of registered rooms');
    return Room.findAll();
  };

  const getAvailable = async (params: AvailableRoomParams) => {
    logger.info('Search available rooms at given timespan');
    const availableRooms = await Room.findAll({
      where: {
        openAt: { [Op.lte]: params.startHour },
        closeAt: { [Op.gte]: params.endHour },
        [Op.and]: sequelize.literal('"roomReservations" IS NULL'),
      },
      include: [{
        model: Reservation,
        required: false,
        as: 'roomReservations',
        where: checkRoomAvailability(params.from, params.to),
      }],
    });

    logger.info(`Found ${availableRooms.length} rooms available for the desired period`);

    return availableRooms;
  };

  const isRoomOpen = async (roomId: string, startHour: string, endHour: string) => 
    !!await Room.findOne({
      where: {
        roomId,
        openAt: { [Op.lte]: startHour },
        closeAt: { [Op.gte]: endHour },
      },
    });

  return {
    getRooms,
    getAvailable,
    isRoomOpen,
  };
};