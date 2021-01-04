import { GraphQLObjectType } from 'graphql';
import createUser from './create-user';
import login from './login';
import createReservation from './create-reservation';
import cancelReservation from './cancel-reservation';

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: (): any => ({
    login,
    createUser,
    createReservation,
    cancelReservation,
  }),
});

export default mutation;
