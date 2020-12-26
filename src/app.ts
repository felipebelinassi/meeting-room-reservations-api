import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { GraphiQLOptions } from 'express-graphql/renderGraphiQL';
import schema from './schema';
import resolvers from './schema/resolvers';

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: resolvers,
  graphiql: {
    defaultQuery: `{
      users { 
        name
        age
      }
    }`,
  } as GraphiQLOptions,
}));

export function start(port: number): Promise<void> {
  return new Promise<void>((resolve) => {
    app.listen(port, () => resolve());
  });
}