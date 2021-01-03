import { GraphQLNonNull, GraphQLString } from 'graphql';
import { Context } from '../../context';
import Room from '../types/room';
import { formatDate } from '../../utils/date-time';

interface RoomsQueryArgs {
  roomId: string;
  date?: string;
}

export default {
  type: Room,
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
  resolve: async (_: any, args: RoomsQueryArgs, context: Context) => {
    const { roomId } = args;
    const date = formatDate(args.date);

    const roomData = await context.repositories.room.getSchedule(roomId, date);

    if (!roomData) throw new Error('Error searching room schedule');

    const { roomReservations, ...room } = roomData.get({ plain: true });
    return {
      ...room,
      date,
      schedule: roomReservations,
    };
  },
};