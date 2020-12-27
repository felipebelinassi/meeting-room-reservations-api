import createRepositories from '../repositories';

const listEmployees = async () => {
  const { employeeRepository } = createRepositories();

  return employeeRepository.listEmployees();
};

export default listEmployees;