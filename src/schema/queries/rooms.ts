import { GraphQLList, GraphQLString } from 'graphql';
import { Context } from '../../context';
import Room from '../types/room';
import { formatDateTime, normalizeTimePeriod } from '../../utils/date-formatters';

interface RoomsQueryArgs {
  date: string;
  startHour: string;
  endHour: string;
}

export default {
  type: new GraphQLList(Room),
  args: {
    date: {
      description: 'Meeting date in YYYY-MM-DD format',
      type: GraphQLString,
    },
    startHour: {
      description: 'Desired meeting start hour in HH:MM format',
      type: GraphQLString,
    },
    endHour: {
      description: 'Desired meeting ending hour in HH:MM format',
      type: GraphQLString,
    },
  },
  resolve: async (_: any, args: RoomsQueryArgs, context: Context) => {
    const { date } = args;
    const startHour = normalizeTimePeriod(args.startHour);
    const endHour = normalizeTimePeriod(args.endHour);

    const startTime = formatDateTime(date, startHour);
    const endTime = formatDateTime(date, endHour);

    if (startTime >= endTime) {
      throw new Error('The meeting ending time needs to be greater than the starting time');
    }

    const availableRooms = await context.repositories.room.getAvailable(startTime, endTime);

    return availableRooms.filter(room => 
      room.openAt <= startHour && room.closeAt >= endHour,
    );
  },
};