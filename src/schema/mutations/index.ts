import { GraphQLObjectType } from 'graphql';
import createEmployee from './create-employee';
import authenticateEmployee from './authenticate-employee';
import createReservation from './create-reservation';

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: (): any => ({
    createEmployee,
    authenticateEmployee,
    createReservation,
  }),
});

export default mutation;
