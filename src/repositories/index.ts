import { PrismaClient } from '@prisma/client';
import employee from './employee-repository';

const prisma = new PrismaClient();

export default function createRepositories() {
  return {
    employeeRepository: employee(prisma),
  };
}
