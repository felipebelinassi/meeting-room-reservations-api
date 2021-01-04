import { GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql';
import Reservation from './reservation';

const room = new GraphQLObjectType({
  name: 'Schedule',
  description: 'Schedule type definition',
  fields: () => ({
    date: {
      type: GraphQLString,
      description: 'Schedule date',
    },
    schedule: {
      type: GraphQLList(Reservation),
      description: 'Schedule events',
    },
  }),
});

export default room;