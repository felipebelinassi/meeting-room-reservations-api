import { GraphQLNonNull } from 'graphql';
import { Context } from '../../context';
import reservationType from '../types/reservation';
import newReservation from '../types/inputs/new-reservation';
import authenticationMiddleware from '../../middlewares/authentication';
import { formatDateTime } from '../../utils/date-formatters';

interface CreateReservationQueryArgs {
  input: {
    roomId: string;
    date: string;
    startHour: string;
    endHour: string;
  }
}

export default {
  type: reservationType,
  args: {
    input: {
      type: GraphQLNonNull(newReservation),
    },
  },
  resolve: async (_: any, { input }: CreateReservationQueryArgs, context: Context) => {
    const { roomId, date, startHour, endHour } = input;
    const { employeeId } = authenticationMiddleware(context.request);
  
    const startTime = formatDateTime(date, startHour);
    const endTime = formatDateTime(date, endHour);

    const [reservation, isAvailable] = await context.repositories.reservation.create({
      roomId,
      employeeId,
      startTime,
      endTime,
    });
    if (!isAvailable) throw new Error('Error creating reservation');
    return reservation;
  },
};
