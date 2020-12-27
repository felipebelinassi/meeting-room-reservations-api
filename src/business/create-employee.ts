import authService from '../services/auth-service';
import createRepositories from '../repositories';

export interface Employee {
  firstName: string;
  lastName: string;
  username: string;
  position: string;
  email: string;
  password: string;
}

const createEmployee = async (params: Employee) => {
  const { employeeRepository } = createRepositories();

  const { password } = params;

  const hashedPassword = await authService().hashPassword(password);

  return employeeRepository.createEmployee({
    ...params, password: hashedPassword,
  });
};

export default createEmployee;