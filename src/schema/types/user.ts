import { GraphQLObjectType, GraphQLNonNull, GraphQLID, GraphQLString } from 'graphql';

const user = new GraphQLObjectType({
  name: 'User',
  description: 'User type definition',
  fields: () => ({
    userId: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'Database ID of an user',
    },
    firstName: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'User first name',
    },
    lastName: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'User last name',
    },
    username: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'User custom username',
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'User email',
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'User password',
      resolve: () => '******',
    },
  }),
});

export default user;