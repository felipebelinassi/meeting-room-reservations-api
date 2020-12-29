import type { Logger } from 'pino';
import models from '../database/models';

const { Room } = models;

export interface RoomRepository {
  getAvailable: () => Promise<any>;
}

export default (logger: Logger): RoomRepository => {
  const getAvailable = async () => {
    logger.info('Get list of available rooms');
    const availableRooms = await Room.findAll();
    return availableRooms;
  };

  return {
    getAvailable,
  };
};
