import { GraphQLNonNull, GraphQLString, GraphQLObjectType } from 'graphql';
import { Context } from '../../context';
import authenticationMiddleware from '../../middlewares/authentication';

interface CancelReservationParams {
  reservationId: string;
}

export default {
  type: new GraphQLObjectType({
    name: 'Cancel',
    description: 'Canceled reservation definition',
    fields: () => ({
      status: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'Cancel reservation status',
        resolve: () => 'Reservation canceled with success',
      },
    }),
  }),
  args: {
    reservationId: {
      description: 'Reservation database ID',
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: async (_: any, { reservationId }: CancelReservationParams, context: Context) => {
    const { userId } = authenticationMiddleware(context.request);

    return context.repositories.reservation.cancel(reservationId, userId);
  },
};
