import { GraphQLNonNull, GraphQLString } from 'graphql';
import { Context } from '../../context';
import Schedule from '../types/schedule';
import { formatDate } from '../../utils/date-time';

interface RoomScheduleQueryArgs {
  roomId: string;
  date?: string;
}

export default {
  type: Schedule,
  args: {
    roomId: {
      description: 'Room database ID',
      type: new GraphQLNonNull(GraphQLString),
    },
    date: {
      description: 'Optional date filter for schedule view',
      type: GraphQLString,
    },
  },
  resolve: async (_: any, args: RoomScheduleQueryArgs, context: Context) => {
    const { roomId } = args;
    const date = formatDate(args.date);
    const schedule = await context.repositories.reservation.getReservations({ roomId, date });
    return { date, schedule };
  },
};
