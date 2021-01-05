import { GraphQLNonNull, GraphQLString } from 'graphql';
import { Context } from '../../context';
import tokenType from '../types/token';
import services from '../../services';

const { authService } = services;

interface CreateTokenParams {
  email: string;
  password: string;
}

export default {
  type: tokenType,
  args: {
    email: {
      description: 'User registered email',
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      description: 'User registered password',
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: async (_: any, { email, password }: CreateTokenParams, context: Context) => {
    const user = await context.repositories.user.getByEmail(email);

    if (!user) {
      throw new Error('The email was not found in the database');
    }

    if (!(await authService.comparePasswords(password, user.password))) {
      throw new Error('User authentication failed');
    }

    const token = authService.generateToken({ ...user });
    return { token, email };
  },
};
