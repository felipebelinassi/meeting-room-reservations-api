import { Request } from 'express';
import loggerMock from '../mocks/logger';

export const requestSpy = () => {
  const mockLocals = {
    logger: loggerMock,
  };

  return {
    headers: {},
    body: {},
    params: {},
    path: '',
    app: {
      locals: mockLocals,
    },
  } as unknown as Request;
};

const mockContext = {
  request: requestSpy(),
  repositories: {
    user: {
      create: jest.fn(),
      getByEmail: jest.fn(),
    },
    room: {
      getRooms: jest.fn(),
      getAvailable: jest.fn(),
      isRoomOpen: jest.fn(),
    },
    reservation: {
      create: jest.fn(),
      get: jest.fn(),
      getReservations: jest.fn(),
    },
  },
};

export default mockContext;
