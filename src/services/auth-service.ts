import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

interface AuthConfig {
  secret: string;
  expiresIn: string;
}

interface AuthService {
  hashPassword: (password: string, salt?: number) => Promise<string>;
  comparePasswords: (password: string, hashPassword: string) => Promise<boolean>;
  generateToken: (payload: Record<string, unknown>) => string;
  decodeToken: (token: string) => EmployeeAttributes;
}

const authService = (config: AuthConfig): AuthService => {
  const hashPassword = async (password: string, salt = 10) => 
    bcrypt.hash(password, salt);

  const comparePasswords = async (password: string, hashedPassword: string) => 
    bcrypt.compare(password, hashedPassword);

  const generateToken = (payload: Record<string, unknown>) => 
    jwt.sign(payload, config.secret, { expiresIn: config.expiresIn });

  const decodeToken = (token: string) => 
    jwt.verify(token, config.secret) as EmployeeAttributes;

  return {
    hashPassword,
    comparePasswords,
    generateToken,
    decodeToken,
  };
};

export default authService;