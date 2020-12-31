import { Request } from 'express';
import createRepositories, { Repositories } from '../repositories';

export interface Context {
  request: Request;
  repositories: Repositories;
}

const context = (req: Request): Context => {
  const { logger } = req.app.locals;

  return {
    request: req,
    repositories: {
      ...createRepositories(logger),
    },
  };
};

export default context;

