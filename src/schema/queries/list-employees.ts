import { GraphQLList } from 'graphql';
import Employee from '../types/employee';
import listEmployees from '../../business/list-employees';

export default {
  type: new GraphQLList(Employee),
  resolve: () => listEmployees(),
};