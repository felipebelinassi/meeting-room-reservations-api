import { GraphQLNonNull } from 'graphql';
import { Context } from '../../context';
import employeeType from '../types/employee';
import newEmployee from '../types/inputs/new-employee';

interface CreateEmployeeParams {
  input: EmployeeAttributes;
}

export default {
  type: employeeType,
  args: {
    input: {
      type: GraphQLNonNull(newEmployee),
    },
  },
  resolve: async (_: any, { input }: CreateEmployeeParams, context: Context) => 
    context.repositories.employee.create(input),
};
