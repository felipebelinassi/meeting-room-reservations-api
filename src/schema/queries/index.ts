import { GraphQLObjectType } from 'graphql';
import users from './users';
import rooms from './rooms';
import roomSchedule from './room-schedule';

const query = new GraphQLObjectType({
  name: 'Query',
  fields: (): any => ({
    users,
    rooms,
    roomSchedule,
  }),
});

export default query;
