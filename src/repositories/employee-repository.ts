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

  return {
    createEmployee,
  };
};

export default createRepository;
