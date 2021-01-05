import { GraphQLObjectType, GraphQLNonNull, GraphQLID, GraphQLString } from 'graphql';

const token = new GraphQLObjectType({
  name: 'Token',
  description: 'Authentication token type definition',
  fields: () => ({
    email: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'Authenticated user email',
    },
    token: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'User authentication token',
    },
  }),
});

export default token;
