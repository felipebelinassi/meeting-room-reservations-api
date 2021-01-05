import { GraphQLObjectType } from 'graphql';
import rooms from './rooms';
import userSchedule from './user-schedule';
import roomSchedule from './room-schedule';

const query = new GraphQLObjectType({
  name: 'Query',
  fields: (): any => ({
    rooms,
    userSchedule,
    roomSchedule,
  }),
});

export default query;
