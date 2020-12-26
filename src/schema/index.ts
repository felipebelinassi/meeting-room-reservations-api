import { buildSchema } from 'graphql';

const schema = buildSchema(`
  type User {
    id: ID
    name: String
    age: Int
  }
  type Query {
    user(id: ID!): User
    users: [User]
  }
  type Mutation {
    createUser(name: String!, age: Int!): User
  }
`);

export default schema;