import { GraphQLNonNull } from 'graphql';
import { Context } from '../../context';
import reservationType from '../types/reservation';
import newReservation from '../types/inputs/new-reservation';
import authenticationMiddleware from '../../middlewares/authentication';
import { validateDateRange, normalizeTimePeriods } from '../../utils/date-time';

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
    const { roomId, start, end } = input;

    if (!validateDateRange(start, end)) throw new Error('Time range is not valid');

    const { userId } = authenticationMiddleware(context.request);

    const { startDate, endDate } = normalizeTimePeriods({
      startDate: start,
      endDate: end,
    });

    const [reservation, isAvailable] = await context.repositories.reservation.create({
      roomId,
      userId,
      startTime: startDate.timestamp,
      endTime: endDate.timestamp,
    });

    if (!isAvailable) throw new Error('Error creating reservation');

    return reservation;
  },
};
