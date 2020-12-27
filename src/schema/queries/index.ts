import { GraphQLObjectType } from 'graphql';
import employees from './list-employees';

const query = new GraphQLObjectType({
  name: 'Query',
  fields: (): any => ({
    employees,
  }),
});

export default query;
