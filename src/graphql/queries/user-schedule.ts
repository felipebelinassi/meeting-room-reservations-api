import { GraphQLString } from 'graphql';
import { Context } from '../../context';
import Schedule from '../types/schedule';
import authenticationMiddleware from '../../middlewares/authentication';
import { formatDate } from '../../utils/date-time';

interface UserScheduleQueryArgs {
  date?: string;
}

export default {
  type: Schedule,
  args: {
    date: {
      description: 'Optional date filter for schedule view',
      type: GraphQLString,
    },
  },
  resolve: async (_: any, args: UserScheduleQueryArgs, context: Context) => {
    const { userId } = authenticationMiddleware(context.request);
    const date = formatDate(args.date);
    const schedule = await context.repositories.reservation.getReservations({ userId, date });
    return { date, schedule };
  }, 
};