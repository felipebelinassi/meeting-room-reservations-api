import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from './schema';
import config from './config';
import context from './context';
import pinoLogger from './logger';
import initDatabase from './database';

const logger = pinoLogger(config.logger);
export const app = express();

app.locals.config = config;
app.locals.logger = logger;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
  context: context(logger),
}));

export function start(port: number): Promise<void> {
  return new Promise<void>((resolve) => {
    app.listen(port, async () => {
      initDatabase(config.database);

      logger.info(`Application listening at port ${port}`);
      resolve();
    });
  });
}