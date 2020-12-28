import { PrismaClient, Employee } from '@prisma/client';

export interface EmployeeParams extends Omit<Employee, 'employeeId' | 'createdAt' | 'updatedAt'> {}

const createRepository = (prisma: PrismaClient) => {
  const createEmployee = async (params: EmployeeParams): Promise<Employee> => {
    const employee = await prisma.employee.create({
      data: { ...params },
    });

    return employee;
  };

  const listEmployees = async (): Promise<Employee[]> => {
    const employees = await prisma.employee.findMany();
    return employees;
  };

  return {
    createEmployee,
    listEmployees,
  };
};

export default createRepository;
