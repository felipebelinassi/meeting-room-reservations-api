import type { Logger } from 'pino';
import { Employee } from '@prisma/client';
import authService from '../services/auth-service';
import createRepositories from '../repositories';
import { EmployeeParams } from '../repositories/employee-repository';

export type CreateEmployee = (logger: Logger, params: EmployeeParams) => Promise<Employee>;

const createEmployee = async (logger: Logger, params: EmployeeParams): Promise<Employee> => {
  logger.info('Registering a new employee to application');

  const { employeeRepository } = createRepositories();
  const hashedPassword = await authService().hashPassword(params.password);

  return employeeRepository.createEmployee({
    ...params, password: hashedPassword,
  });
};

export default createEmployee;