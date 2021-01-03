import type { Logger } from 'pino';
import models from '../database/models';

const { User } = models;

export interface UserParams extends Omit<UserAttributes, 'employeeId' | 'createdAt' | 'updatedAt'> {}

export interface UserRepository {
  create: (params: UserParams) => Promise<UserAttributes>;
  getByEmail: (email: string) => Promise<UserAttributes | null>;
}

export default (logger: Logger): UserRepository => {
  const create = async (params: UserParams) => {
    logger.info('Register a new user to database');
    return User.create({ ...params });
  };

  const getByEmail = async (email: string) => {
    logger.info('Find registered user by email');
    return User.findOne({ 
      where: { email }, 
      raw: true,
    });
  };

  return {
    create,
    getByEmail,
  };
};
