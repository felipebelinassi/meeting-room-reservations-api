import { GraphQLNonNull, GraphQLString, GraphQLObjectType } from 'graphql';
import { Context } from '../../context';
import authenticationMiddleware from '../../middlewares/authentication';
import { formatDate } from '../../utils/date-time';

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
    const reservation = await context.repositories.reservation.get(reservationId, userId);
    if (!reservation) throw new Error('Reservation not found');

    const reservationStart = reservation.getDataValue('startAt');

    if (formatDate(reservationStart) <= formatDate()) {
      throw new Error('Cannot cancel this reservation');
    }

    return reservation.destroy();
  },
};
