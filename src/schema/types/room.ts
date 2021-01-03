import { GraphQLObjectType, GraphQLNonNull, GraphQLID, GraphQLString, GraphQLList } from 'graphql';
import Reservation from './reservation';

const room = new GraphQLObjectType({
  name: 'Room',
  description: 'Room type definition',
  fields: () => ({
    roomId: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'Database ID of a room',
    },
    description: {
      type: GraphQLString,
      description: 'Room optional description',
    },
    openAt: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Room opening hour',
    },
    closeAt: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Room closing hour',
    },
    date: {
      type: GraphQLString,
      description: 'Room reservation schedule date',
    },
    schedule: {
      type: GraphQLList(Reservation),
      description: 'Room reservation schedule',
    },
  }),
});

export default room;