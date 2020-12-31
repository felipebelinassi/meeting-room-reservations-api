import { GraphQLID, GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from 'graphql';

export default new GraphQLInputObjectType({
  name: 'NewReservation',
  fields: {
    roomId: {
      type: new GraphQLNonNull(GraphQLID),
    },
    date: {
      type: new GraphQLNonNull(GraphQLString),
    },
    startHour: {
      type: new GraphQLNonNull(GraphQLString), 
    },
    endHour: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
});