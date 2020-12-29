import type { Logger } from 'pino';
import createRepositories, { Repositories } from '../repositories';

export interface Context extends Repositories {}

const context = (logger: Logger): Context => createRepositories(logger);

export default context;
