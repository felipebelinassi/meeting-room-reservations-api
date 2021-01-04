import type { Logger } from 'pino';
import createModels from '../database/models';
import userRepository, { UserRepository } from './user-repository';
import roomRepository, { RoomRepository } from './room-repository';
import reservationRepository, { ReservationRepository } from './reservation-repository';

const models = createModels();

export interface Repositories {
  user: UserRepository;
  room: RoomRepository;
  reservation: ReservationRepository;
}

export default function createRepositories(logger: Logger): Repositories {
  return {
    user: userRepository(logger, models),
    room: roomRepository(logger, models),
    reservation: reservationRepository(logger, models),
  };
}
