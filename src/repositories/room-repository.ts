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
  getAvailable: (params: AvailableRoomParams) => Promise<RoomInstance[]>;
  getSchedule: (roomId: string, date: string) => Promise<RoomInstance | null>;
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

  const getSchedule = async (roomId: string, date: string) => {
    logger.info('Get room meeting schedule');
    return Room.findOne({
      where: { roomId },
      include: [{
        model: Reservation,
        required: false,
        as: 'roomReservations',
        where: {
          [Op.and]: [
            sequelize.where(sequelize.fn('date', sequelize.col('start_at')), '=', date),
            sequelize.where(sequelize.fn('date', sequelize.col('end_at')), '=', date),
          ],
        },
      }],
      order: [
        [{
          model: Reservation,
          as: 'roomReservations',
        }, 'startAt', 'asc'],
      ],
    });
  };

  return {
    getAvailable,
    getSchedule,
  };
};