import express, { Request } from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from './graphql';
import config from './config';
import context from './context';
import pinoLogger from './logger';

const logger = pinoLogger(config.logger);
export const app = express();

app.locals.config = config;
app.locals.logger = logger;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/graphql', graphqlHTTP((req) => ({
  schema,
  graphiql: { headerEditorEnabled: true },
  context: context(req as Request),
})));

export function start(port: number): Promise<void> {
  return new Promise<void>((resolve) => {
    app.listen(port, async () => {
      logger.info(`Application listening at port ${port}`);
      resolve();
    });
  });
}