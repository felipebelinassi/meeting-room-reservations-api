import { Request } from 'express';
import services from '../../../src/services';
import authMiddleware from '../../../src/middlewares/authentication';

const { authService } = services;

describe('Auth middleware', () => {
  it('should verify a JWT token return decoded info', () => {
    const mockData = { data: 'fake' };
    const jwtToken = authService.generateToken(mockData);
    const reqFake = {
      headers: {
        'x-access-token': jwtToken,
      },
    } as unknown as Request;

    const decodedToken = authMiddleware(reqFake);
    expect(decodedToken).toEqual(expect.objectContaining(mockData));
  });

  it('should return UNAUTHORIZED when there is a problem on token verification', () => {
    const reqFake = {
      headers: {
        'x-access-token': 'invalid token',
      },
    } as unknown as Request;

    expect(() => authMiddleware(reqFake)).toThrow('jwt malformed');
  });

  it('should return UNAUTHORIZED if no token is informed', () => {
    const reqFake = {
      headers: {},
    } as unknown as Request;

    expect(() => authMiddleware(reqFake)).toThrow('jwt must be provided');
  });
});
