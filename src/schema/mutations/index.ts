import { GraphQLObjectType } from 'graphql';
import createEmployee from './create-employee';

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: (): any => ({
    createEmployee,
  }),
});

export default mutation;
