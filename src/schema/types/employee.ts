import { GraphQLObjectType, GraphQLNonNull, GraphQLID, GraphQLString } from 'graphql';

const Employee = new GraphQLObjectType({
  name: 'Employee',
  description: 'Employee type definition',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'Databse ID of an employee',
    },
    firstName: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Employee first name',
    },
    lastName: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Employee last name',
    },
    username: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Employee username',
    },
    position: {
      type: GraphQLString,
      description: 'Employee position',
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Employee business email',
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Employee password',
    },
  }),
});

export default Employee;