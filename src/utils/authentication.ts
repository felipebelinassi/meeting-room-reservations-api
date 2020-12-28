import bcrypt from 'bcrypt';

export const hashPassword = async (password: string, salt = 10) => bcrypt.hash(password, salt);

export const comparePasswords = async (password: string, hashedPassword: string) => bcrypt.compare(password, hashedPassword);
