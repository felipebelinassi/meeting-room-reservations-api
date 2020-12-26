import { GraphQLNonNull } from 'graphql';
import employeeType from '../types/employee';
import newEmployee from '../types/inputs/new-employee';

export default {
  type: employeeType,
  args: {
    input: {
      type: GraphQLNonNull(newEmployee),
    },
  },
  resolve: (_, params) => params.input.id,
};
