import { GraphQLID, GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from 'graphql';

export default new GraphQLInputObjectType({
  name: 'NewReservation',
  fields: {
    roomId: {
      type: new GraphQLNonNull(GraphQLID),
    },
    start: {
      type: new GraphQLNonNull(GraphQLString), 
    },
    end: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
});