import type { Logger } from 'pino';
import employeeRepository, { EmployeeRepository } from './employee-repository';
import roomRepository, { RoomRepository } from './room-repository';
import reservationRepository, { ReservationRepository } from './reservation-repository';

export interface Repositories {
  employee: EmployeeRepository;
  room: RoomRepository;
  reservation: ReservationRepository;
}

export default function createRepositories(logger: Logger): Repositories {
  return {
    employee: employeeRepository(logger),
    room: roomRepository(logger),
    reservation: reservationRepository(logger),
  };
}
