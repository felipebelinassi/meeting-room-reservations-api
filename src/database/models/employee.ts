import { Model, Sequelize, DataTypes } from 'sequelize';

interface EmployeeInstance extends Model {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  position: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export default (sequelize: Sequelize) => sequelize.define<EmployeeInstance>('Employee', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING,
    field: 'first_name',
  },
  lastName: {
    type: DataTypes.STRING,
    field: 'last_name',
  },
  username: {
    type: DataTypes.STRING,
    field: 'username',
  },
  position: {
    type: DataTypes.STRING,
    field: 'position',
  },
  email: {
    type: DataTypes.STRING,
    field: 'email',
  },
  password: {
    type: DataTypes.STRING,
    field: 'password',
  },
  createdAt: {
    type: DataTypes.DATE,
    field: 'created_at,',
  },
  updatedAt: {
    type: DataTypes.DATE,
    field: 'updated_at',
  },
}, {
  tableName: 'employees',
  schema: 'employees',
});