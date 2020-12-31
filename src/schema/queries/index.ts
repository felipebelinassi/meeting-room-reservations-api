import { GraphQLObjectType } from 'graphql';
import employees from './employees';
import rooms from './rooms';

const query = new GraphQLObjectType({
  name: 'Query',
  fields: (): any => ({
    employees,
    rooms,
  }),
});

export default query;
