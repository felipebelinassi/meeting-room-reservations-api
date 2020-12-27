import { GraphQLNonNull } from 'graphql';
import employeeType from '../types/employee';
import newEmployee from '../types/inputs/new-employee';
import createEmployee from '../../business/create-employee';

export default {
  type: employeeType,
  args: {
    input: {
      type: GraphQLNonNull(newEmployee),
    },
  },
  resolve: (_: any, params: any) => {
    const { input } = params;
    return createEmployee(input);
  },
};
