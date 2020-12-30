import { GraphQLList } from 'graphql';
import { Context } from '../../context';
import Employee from '../types/employee';

interface EmployeesArguments {}

export default {
  type: new GraphQLList(Employee),
  resolve: async (_: any, args: EmployeesArguments, context: Context) => context.employee.getList(),
};