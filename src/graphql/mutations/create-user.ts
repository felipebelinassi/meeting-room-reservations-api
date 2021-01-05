import { GraphQLNonNull } from 'graphql';
import { Context } from '../../context';
import employeeType from '../types/user';
import newEmployee from '../types/inputs/new-user';

interface CreateUserParams {
  input: Omit<UserAttributes, 'userId'>;
}

export default {
  type: employeeType,
  args: {
    input: {
      type: GraphQLNonNull(newEmployee),
    },
  },
  resolve: async (_: any, { input }: CreateUserParams, context: Context) => context.repositories.user.create(input),
};
