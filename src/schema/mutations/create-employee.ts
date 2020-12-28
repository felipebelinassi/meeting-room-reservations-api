import { GraphQLNonNull } from 'graphql';
import { Employee } from '@prisma/client';
import { Context } from '../../context';
import employeeType from '../types/employee';
import newEmployee from '../types/inputs/new-employee';
import { hashPassword } from '../../utils/authentication';

interface CreateEmployeeParams {
  input: Employee;
}

export default {
  type: employeeType,
  args: {
    input: {
      type: GraphQLNonNull(newEmployee),
    },
  },
  resolve: async (_: any, { input }: CreateEmployeeParams, context: Context) => {
    const hashedPassword = await hashPassword(input.password);
    return context.employee.create({ 
      ...input,
      password: hashedPassword,
    });
  },
};
