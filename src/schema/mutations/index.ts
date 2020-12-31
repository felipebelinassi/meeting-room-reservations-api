import { GraphQLObjectType } from 'graphql';
import createEmployee from './create-employee';
import authenticateEmployee from './authenticate-employee';

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: (): any => ({
    createEmployee,
    authenticateEmployee,
  }),
});

export default mutation;
