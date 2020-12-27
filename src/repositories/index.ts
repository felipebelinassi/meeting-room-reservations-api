import { PrismaClient } from '@prisma/client';
import employee from './employee-repository';

const prisma = new PrismaClient();

export default {
  employeeRepository: employee(prisma),
};
