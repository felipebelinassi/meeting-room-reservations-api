import type { Logger } from 'pino';
import models from '../database/models';

const { Employee } = models;

export interface EmployeeParams extends Omit<EmployeeAttributes, 'employeeId' | 'createdAt' | 'updatedAt'> {}

export interface EmployeeRepository {
  create: (params: EmployeeParams) => Promise<EmployeeAttributes>;
  getList: () => Promise<EmployeeAttributes[]>;
  getByEmail: (email: string) => Promise<EmployeeAttributes | null>;
}

export default (logger: Logger): EmployeeRepository => {
  const create = async (params: EmployeeParams) => {
    logger.info('Register a new employee to database');
    const employee = await Employee.create({ ...params });

    return employee;
  };

  const getList = async () => {
    logger.info('Get list of registered employees');
    const employees = await Employee.findAll();
    return employees;
  };

  const getByEmail = async (email: string) => {
    logger.info('Find registered employee by email');
    return Employee.findOne({ 
      where: { email }, 
    });
  };

  return {
    create,
    getList,
    getByEmail,
  };
};
