import type { Logger } from 'pino';
import userRepository, { UserRepository } from './user-repository';
import roomRepository, { RoomRepository } from './room-repository';
import reservationRepository, { ReservationRepository } from './reservation-repository';

export interface Repositories {
  user: UserRepository;
  room: RoomRepository;
  reservation: ReservationRepository;
}

export default function createRepositories(logger: Logger): Repositories {
  return {
    user: userRepository(logger),
    room: roomRepository(logger),
    reservation: reservationRepository(logger),
  };
}
