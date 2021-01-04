import createUser from '../../../../src/graphql/mutations/create-user';
import mockContext from '../../../doubles/spys/context';

const { repositories: mockRepositories } = mockContext;

describe('Create user mutation unit tests', () => {
  it('should return the created user', async () => {
    const fakeParams = { 
      input: {
        firstName: 'John',
        lastName: 'Doe',
        username: 'johndoe',
        email: 'johndoe@gmail.com',
        password: 'p4$$w0rd',
      },
    };

    mockRepositories.user.create.mockResolvedValue({
      ...fakeParams.input,
      userId: 'db78cf2c-876e-4f00-b2c6-f228eb823b19',
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
    });

    const response = await createUser.resolve(undefined, fakeParams, mockContext);
    expect(response).toEqual(expect.objectContaining({
      ...fakeParams.input,
    }));
  });
});