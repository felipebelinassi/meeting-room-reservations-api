import type { Logger } from 'pino';
import employeeRepository, { EmployeeRepository } from './employee-repository';
import roomRepository, { RoomRepository } from './room-repository';

export interface Repositories {
  employee: EmployeeRepository;
  room: RoomRepository;
}

export default function createRepositories(logger: Logger): Repositories {
  return {
    employee: employeeRepository(logger),
    room: roomRepository(logger),
  };
}
