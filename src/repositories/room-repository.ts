import type { Logger } from 'pino';
import sequelize from 'sequelize';
import models from '../database/models';
import Reservation from '../database/models/reservation';
import { RoomAttributes } from '../database/models/room';

const { Room } = models;

export interface RoomRepository {
  getAvailable: (startTime: Date, endTime: Date) => Promise<RoomAttributes[]>;
}

export default (logger: Logger): RoomRepository => {
  const getAvailable = async (startTime: Date, endTime: Date) => {
    logger.info('Get list of available rooms at given period');

    console.log(startTime, endTime);

    const availableRooms = await Room.findAll({
      where: sequelize.literal('reservations.roomId IS null'),
      include: [
        { model: Reservation },
      ],
    });
    return availableRooms;

    console.log(availableRooms);
    // const room: RawRoom[] = await prisma.$queryRaw(`
    //   SELECT *
    //   FROM room AS ro 
    //   WHERE NOT EXISTS (
    //     SELECT re.room_id, re.start_at, re.end_at   
    //     FROM reservation AS re
    //     WHERE ro.room_id = re.room_id
    //     AND re.start_at >= $1
    //     and re.end_at <= $2
    //   )`, startTime, endTime,
    // );

    // const formattedRooms = room.map(item => ({
    //   roomId: item.room_id,
    //   description: item.description,
    //   openAt: item.open_at,
    //   closeAt: item.close_at,
    // }));

    // return formattedRooms;
  };

  return {
    getAvailable,
  };
};