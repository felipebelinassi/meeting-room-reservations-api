import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const hashPassword = async (password: string, salt = 10) =>
  bcrypt.hash(password, salt);

export const comparePasswords = async (password: string, hashedPassword: string) =>
  bcrypt.compare(password, hashedPassword);

// TODO: Get authKey and expiresIn from config file (dependency injection?)
export const generateToken = (payload: Record<string, unknown>) =>
  jwt.sign(payload, 'superduperkey', { expiresIn: 100000 });