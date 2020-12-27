import listEmployees from '../../../../src/business/list-employees';

const listEmployeesSpy = jest.fn().mockReturnValue({});
jest.mock('../../../../src/repositories', () => 
  jest.fn(() => ({
    employeeRepository: { listEmployees: listEmployeesSpy },
  })),
);

describe('List employees unit tests', () => {
  it('should return a list of registered employees', async () => {
    const expectedResponse = [
      {
        firstName: 'John',
        lastName: 'Doe',
        username: 'johndoe',
      }, 
      {
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'janedoe',
      },
      {
        firstName: 'John',
        lastName: 'Wyatt',
        email: 'johwyatt',
      },
    ];

    listEmployeesSpy.mockResolvedValue(expectedResponse);

    const response = await listEmployees();
    expect(response).toEqual(expectedResponse);
  });
});

