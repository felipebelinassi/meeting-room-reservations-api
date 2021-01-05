import login from '../../../../src/graphql/mutations/login';
import mockContext from '../../../doubles/spys/context';
import services from '../../../../src/services';

const { authService } = services;

const { repositories: mockRepositories } = mockContext;

describe('Login mutation unit tests', () => {
  it('should throw an error if user is not found in database', async () => {
    const fakeParams = { 
      email: 'johndoe@gmail.com',
      password: 'p4$$w0rd',
    };

    mockRepositories.user.getByEmail.mockResolvedValue(null);

    const response = login.resolve(undefined, fakeParams, mockContext);
    await expect(() => response).rejects.toThrow(Error);
  });

  it('should throw an error if user password does not match with registered password', async () => {
    const fakeParams = { 
      email: 'johndoe@gmail.com',
      password: 'p4$$w0rd',
    };

    mockRepositories.user.getByEmail.mockResolvedValue({
      userId: 'db78cf2c-876e-4f00-b2c6-f228eb823b19',
      email: 'johndoe@gmail.com',
      password: 'password',
    });

    const response = login.resolve(undefined, fakeParams, mockContext);
    await expect(() => response).rejects.toThrow(Error);
  });

  it('should authenticated user and return a valid auth token', async () => {
    const fakeParams = { 
      email: 'johndoe@gmail.com',
      password: 'p4$$w0rd',
    };
    const hashedPassword = await authService.hashPassword(fakeParams.password);

    mockRepositories.user.getByEmail.mockResolvedValue({
      userId: 'db78cf2c-876e-4f00-b2c6-f228eb823b19',
      email: 'johndoe@gmail.com',
      password: hashedPassword,
    });

    const response = await login.resolve(undefined, fakeParams, mockContext);
    expect(response).toEqual({
      email: fakeParams.email,
      token: expect.any(String),
    });
  });
});