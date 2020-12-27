import authService from '../services/auth-service';
import repositories from '../repositories';

interface Employee {
  firstName: string;
  lastName: string;
  username: string;
  position: string;
  email: string;
  password: string;
}

const createEmployee = async (params: Employee) => {
  const { employeeRepository } = repositories;

  const { password } = params;

  const hashedPassword = await authService().hashPassword(password);

  return employeeRepository.createEmployee({
    ...params, password: hashedPassword,
  });
};

export default createEmployee;