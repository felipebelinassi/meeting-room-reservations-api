import { Request } from 'express';
import services from '../services';

const { authService } = services;

const authMiddleware = (req: Request): UserAttributes => {
  const token = req.headers['x-access-token'];
  try {
    const decoded = authService.decodeToken(token as string);
    return decoded;
  } catch (err) {
    throw new Error(err.message);
  }
};

export default authMiddleware;
