import type { Logger } from 'pino';
import { Employee } from '@prisma/client';
import createEmployee from '../business/create-employee';
import listEmployees from '../business/list-employees';
import { EmployeeParams } from '../repositories/employee-repository';

export interface Context {
  logger: Logger,
  rules: {
    createEmployee: (logger: Logger, params: EmployeeParams) => Promise<Employee>;
    listEmployees: (logger: Logger) => Promise<Employee[]>;
  }
}

const context = (logger: Logger) => ({
  logger,
  rules: {
    createEmployee,
    listEmployees,
  },
});

export default context;
