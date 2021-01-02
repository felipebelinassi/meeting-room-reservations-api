import { GraphQLList, GraphQLNonNull, GraphQLString } from 'graphql';
import { Context } from '../../context';
import Room from '../types/room';
import { validateDateRange, normalizeTimePeriods } from '../../utils/date-time';

interface RoomsQueryArgs {
  from: string;
  to: string;
}

export default {
  type: new GraphQLList(Room),
  args: {
    from: {
      description: 'Initial timestamp to search for room availability',
      type: new GraphQLNonNull(GraphQLString),
    },
    to: {
      description: 'Ending timestamp to search for room availability',
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: async (_: any, args: RoomsQueryArgs, context: Context) => {
    const { from, to } = args;

    if (!validateDateRange(from, to)) {
      throw new Error('Time range is not valid');
    }
  
    const { startDate, endDate } = normalizeTimePeriods({
      startDate: from,
      endDate: to,
    });

    return context.repositories.room.getAvailable({
      from: startDate.timestamp,
      startHour: startDate.time,
      to: endDate.timestamp,
      endHour: endDate.time,
    });
  },
};