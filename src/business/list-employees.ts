import type { Logger } from 'pino';
import createRepositories from '../repositories';

const listEmployees = async (logger: Logger) => {
  logger.info('Fetch list of registered employees');
  const { employeeRepository } = createRepositories();

  return employeeRepository.listEmployees();
};

export default listEmployees;