import type { Logger } from 'pino';
import { PrismaClient, Employee } from '@prisma/client';

export interface EmployeeParams extends Omit<Employee, 'employeeId' | 'createdAt' | 'updatedAt'> {}

export interface EmployeeRepository {
  create: (params: EmployeeParams) => Promise<Employee>;
  getList: () => Promise<Employee[]>;
}

export default (logger: Logger, prisma: PrismaClient): EmployeeRepository => {
  const create = async (params: EmployeeParams) => {
    logger.info('Register a new employee to database');
    const employee = await prisma.employee.create({
      data: { ...params },
    });

    return employee;
  };

  const getList = async () => {
    logger.info('Get list of registered employees');
    const employees = await prisma.employee.findMany();
    return employees;
  };

  return {
    create,
    getList,
  };
};
