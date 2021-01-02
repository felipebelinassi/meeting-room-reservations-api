import { GraphQLList, GraphQLNonNull, GraphQLString } from 'graphql';
import { Context } from '../../context';
import Room from '../types/room';
import { normalizePeriods } from '../../utils/date-formatters';

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
    const { from, to } = normalizePeriods({
      from: args.from,
      to: args.to,
    });

    if (from.time >= to.time) {
      throw new Error('The meeting ending time needs to be greater than the starting time');
    }

    return context.repositories.room.getAvailable(from.time, to.time, from.timestamp, to.timestamp);
  },
};