import { PrismaClient } from '@prisma/client';

interface Employee {
  firstName: string;
  lastName: string;
  username: string;
  position: string;
  email: string;
  password: string;
}

const createRepository = (prisma: PrismaClient) => {
  const createEmployee = async (params: Employee) => {
    const employee = await prisma.employee.create({
      data: { ...params },
    });

    return employee;
  };

  const listEmployees = async () => {
    const employees = await prisma.employee.findMany();
    return employees;
  };

  return {
    createEmployee,
    listEmployees,
  };
};

export default createRepository;
