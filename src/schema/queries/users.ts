import { GraphQLList } from 'graphql';
import { Context } from '../../context';
import User from '../types/user';

interface UsersQueryArgs {}

export default {
  type: new GraphQLList(User),
  resolve: async (_: any, args: UsersQueryArgs, context: Context) => 
    context.repositories.user.getUsers(),
};