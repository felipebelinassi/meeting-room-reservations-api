import { GraphQLNonNull } from 'graphql';
import { Context } from '../../context';
import employeeType from '../types/employee';
import newEmployee from '../types/inputs/new-employee';

interface CreateEmployeeQueryArgs {
  input: EmployeeAttributes;
}

export default {
  type: employeeType,
  args: {
    input: {
      type: GraphQLNonNull(newEmployee),
    },
  },
  resolve: async (_: any, { input }: CreateEmployeeQueryArgs, context: Context) => 
    context.repositories.employee.create(input),
};
