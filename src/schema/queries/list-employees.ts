import { GraphQLList } from 'graphql';
import Employee from '../types/employee';

export default {
  type: new GraphQLList(Employee),
  resolve: (_, args) => {
    console.log(_, args);
  },
};