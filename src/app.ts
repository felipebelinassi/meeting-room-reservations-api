import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from './schema';

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

export function start(port: number): Promise<void> {
  return new Promise<void>((resolve) => {
    app.listen(port, () => resolve());
  });
}