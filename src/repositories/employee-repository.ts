import type { Logger } from 'pino';
import models from '../database/models';
import { EmployeeAttributes } from '../database/models/employee';

const { Employee } = models;

export interface EmployeeParams extends Omit<EmployeeAttributes, 'employeeId' | 'createdAt' | 'updatedAt'> {}

export interface EmployeeRepository {
  create: (params: EmployeeParams) => Promise<EmployeeAttributes>;
  getList: () => Promise<EmployeeAttributes[]>;
}

export default (logger: Logger): EmployeeRepository => {
  const create = async (params: EmployeeParams) => {
    logger.info('Register a new employee to database');
    const employee = await Employee.create({
      ...params,
      employeeId: 'a6fbe83a-1f69-4d7a-b894-328ec62fd97a',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return employee;
  };

  const getList = async () => {
    logger.info('Get list of registered employees');
    const employees = await Employee.findAll();
    return employees;
  };

  return {
    create,
    getList,
  };
};
