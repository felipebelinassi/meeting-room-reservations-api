import { GraphQLObjectType } from 'graphql';
import users from './users';
import rooms from './rooms';

const query = new GraphQLObjectType({
  name: 'Query',
  fields: (): any => ({
    users,
    rooms,
  }),
});

export default query;
