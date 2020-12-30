import { GraphQLNonNull, GraphQLString } from 'graphql';
import { Context } from '../../context';
import tokenType from '../types/token';
import { comparePasswords, generateToken } from '../../utils/authentication';

interface CreateTokenArguments {
  email: string;
  password: string;
}

export default {
  type: tokenType,
  args: {
    email: {
      description: 'Employee registered email',
      type: new GraphQLNonNull(GraphQLString),
      
    },
    password: {
      description: 'Employee registered password',
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: async (_: any, { email, password }: CreateTokenArguments, context: Context) => {
    const employee = await context.employee.getByEmail(email);
    
    if (!employee) {
      throw new Error('The email was not found in the database');
    }

    if (!(await comparePasswords(password, employee.password))) {
      throw new Error('Employee authentication failed');
    }

    const token = generateToken({ ...employee});
    return { token, email };
  },
};
