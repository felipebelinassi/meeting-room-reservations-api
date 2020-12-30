import type { Logger } from 'pino';
import sequelize from 'sequelize';
import db from '../database/models/instance';
import Room, { RoomAttributes } from '../database/models/room';

export interface RoomRepository {
  getAvailable: (startTime: string, endTime: string) => Promise<RoomAttributes[]>;
}

export default (logger: Logger): RoomRepository => {
  const getAvailable = async (startTime: string, endTime: string) => {
    logger.info('Get list of available rooms at given period');
    const availableRooms = await db.sequelize.query(`
      SELECT * FROM meeting.room AS ro 
      WHERE NOT EXISTS (
        SELECT re.room_id, re.start_at, re.end_at   
        FROM meeting.reservation AS re
        WHERE ro.room_id = re.room_id
        AND re.start_at >= :startTime
        AND re.end_at <= :endTime
      )`, 
    { 
      type: sequelize.QueryTypes.SELECT,
      model: Room,
      mapToModel: true,
      raw: true,
      replacements: {
        startTime, endTime,
      },
    });

    logger.info(`Found ${availableRooms.length} rooms without reservations at desired period`);

    return availableRooms;
  };


  return {
    getAvailable,
  };
};