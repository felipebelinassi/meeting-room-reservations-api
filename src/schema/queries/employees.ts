import { GraphQLList } from 'graphql';
import { Context } from '../../context';
import Employee from '../types/employee';

interface EmployeesQueryArgs {}

export default {
  type: new GraphQLList(Employee),
  resolve: async (_: any, args: EmployeesQueryArgs, context: Context) => 
    context.repositories.employee.getList(),
};