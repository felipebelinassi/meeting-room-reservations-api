import { GraphQLObjectType, GraphQLNonNull, GraphQLID, GraphQLString } from 'graphql';

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
  }),
});

export default room;