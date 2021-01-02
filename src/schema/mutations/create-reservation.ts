import { GraphQLNonNull } from 'graphql';
import { Context } from '../../context';
import reservationType from '../types/reservation';
import newReservation from '../types/inputs/new-reservation';
import authenticationMiddleware from '../../middlewares/authentication';
import { normalizePeriods } from '../../utils/date-formatters';

interface CreateReservationParams {
  input: {
    roomId: string;
    start: string;
    end: string;
  }
}

export default {
  type: reservationType,
  args: {
    input: {
      type: GraphQLNonNull(newReservation),
    },
  },
  resolve: async (_: any, { input }: CreateReservationParams, context: Context) => {
    const { roomId } = input;
    const { userId } = authenticationMiddleware(context.request);

    const { start, end } = normalizePeriods({
      start: input.start,
      end: input.end,
    });

    const [reservation, isAvailable] = await context.repositories.reservation.create({
      roomId,
      userId,
      startTime: start.timestamp,
      endTime: end.timestamp,
    });

    if (!isAvailable) throw new Error('Error creating reservation');

    return reservation;
  },
};
