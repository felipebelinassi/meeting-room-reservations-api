import { GraphQLObjectType, GraphQLNonNull, GraphQLID, GraphQLString } from 'graphql';

const reservation = new GraphQLObjectType({
  name: 'Reservation',
  description: 'Reservation type definition',
  fields: () => ({
    reservationId: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'Database ID of a reservation',
    },
    roomId: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'Id of the reserved room',
    },
    roomDescription: {
      type: GraphQLString,
      description: 'Description of the reserved room',
      resolve: (res) => res.room.description,
    },
    reservedBy: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'User who made the reservation',
    },
    reservedByName: {
      type: GraphQLString,
      description: 'Name of the user who made the reservation',
      resolve: (res) => res.user.firstName,
    },
    startAt: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Meeting start date and time',
    },
    endAt: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Meeting end date and time',
    },
  }),
});

export default reservation;
