import { GraphQLNonNull } from 'graphql';
import { Employee } from '@prisma/client';
import { Context } from '../../context';
import employeeType from '../types/employee';
import newEmployee from '../types/inputs/new-employee';

interface CreateEmployeeParams {
  input: Employee;
}

export default {
  type: employeeType,
  args: {
    input: {
      type: GraphQLNonNull(newEmployee),
    },
  },
  resolve: (_: any, { input }: CreateEmployeeParams, context: Context) => {
    const logger = context.logger.child({ feature: 'Create a new employee' });
    return context.rules.createEmployee(logger, input);
  },
};
