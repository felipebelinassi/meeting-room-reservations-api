import loggerMock from '../../doubles/mocks/logger';
import createRepositories from '../../../src/repositories';

const createSpy = jest.fn();
const findOneSpy = jest.fn();

jest.mock('../../../src/database/models', () => 
  jest.fn(() => ({
    User: {
      create: createSpy,
      findOne: findOneSpy,
    },
  })),
);

describe('User repository unit tests', () => {
  it('should create and return a new user', async () => {
    const { user: userRepository } = createRepositories(loggerMock);

    const mockUser = {
      firstName: 'John',
      lastName: 'Doe',
      username: 'johndoe',
      email: 'johndoe@gmail.com',
      password: 'p4$$w0rd',
    };

    createSpy.mockResolvedValue({
      ...mockUser,
      userId: '735abd5a-e23a-4773-83c1-03755a2f6fd0',
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
    });

    const newUser = await userRepository.create(mockUser);
    expect(newUser).toEqual(expect.objectContaining(mockUser));
  });

  it('should return a single user by email', async () => {
    const { user: userRepository } = createRepositories(loggerMock);

    const fakeEmail = 'johndoe@gmail.com';

    const expectedResponse = {
      userId: '735abd5a-e23a-4773-83c1-03755a2f6fd0',
      firstName: 'John',
      lastName: 'Doe',
      username: 'johndoe',
      email: 'johndoe@gmail.com',
      password: 'p4$$w0rd',
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
    };

    findOneSpy.mockResolvedValue(expectedResponse);

    const newUser = await userRepository.getByEmail(fakeEmail);
    expect(newUser).toEqual(expectedResponse);
  });
});
