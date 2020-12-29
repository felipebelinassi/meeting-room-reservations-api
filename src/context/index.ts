import type { Logger } from 'pino';
import { PrismaClient } from '@prisma/client';
import createRepositories, { Repositories } from '../repositories';

export interface Context extends Repositories {}

const prisma = new PrismaClient();

const context = (logger: Logger): Context => createRepositories(logger, prisma);

export default context;
