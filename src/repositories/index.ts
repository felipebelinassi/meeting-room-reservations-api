import type { Logger } from 'pino';
import { PrismaClient } from '@prisma/client';
import employeeRepository, { EmployeeRepository } from './employee-repository';

export interface Repositories {
  employee: EmployeeRepository;
}

export default function createRepositories(logger: Logger, prisma: PrismaClient): Repositories {
  return {
    employee: employeeRepository(logger, prisma),
  };
}
