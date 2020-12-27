import createEmployee from '../../../../src/business/create-employee';
import loggerMock from '../../../doubles/mocks/logger';

const createEmployeeSpy = jest.fn().mockReturnValue({});
jest.mock('../../../../src/repositories', () => 
  jest.fn(() => ({
    employeeRepository: { createEmployee: createEmployeeSpy },
  })),
);

describe('Create employee unit tests', () => {
  it('should return a new employee with an encrypted password', async () => {
    const newEmployee = {
      firstName: 'John',
      lastName: 'Doe',
      username: 'johndoe',
      position: 'Developer',
      email: 'john@mail.com',
      password: '1234',
    };

    createEmployeeSpy.mockResolvedValue({ ...newEmployee, password: '****' });

    const response = await createEmployee(loggerMock, newEmployee);
    expect(response).toEqual(expect.objectContaining({
      ...newEmployee,
      password: expect.any(String),
    }));
  });
});

