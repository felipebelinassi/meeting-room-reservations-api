import { GraphQLList } from 'graphql';
import { Context } from '../../context';
import Employee from '../types/employee';

interface EmployeesArguments {}

export default {
  type: new GraphQLList(Employee),
  resolve: (_: any, args: EmployeesArguments, context: Context) => {
    const logger = context.logger.child({ feature: 'List of employees' });
    return context.rules.listEmployees(logger);
  },
};