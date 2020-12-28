import { GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from 'graphql';

export default new GraphQLInputObjectType({
  name: 'NewEmployee',
  fields: {
    firstName: {
      type: new GraphQLNonNull(GraphQLString),
    },
    lastName: {
      type: new GraphQLNonNull(GraphQLString),
    },
    username: {
      type: new GraphQLNonNull(GraphQLString), 
    },
    position: {
      type: new GraphQLNonNull(GraphQLString),
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
});