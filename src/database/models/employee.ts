import { Model, Optional, DataTypes } from 'sequelize';
import { CustomModel } from './types';
import db from './instance';

export interface EmployeeAttributes {
  employeeId: string;
  firstName?: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  createdAt?: string;
  updatedAt?: string;
}

interface EmployeeCreationAttributes extends Optional<EmployeeAttributes, 'employeeId' | 'createdAt' | 'updatedAt'> {}

interface EmployeeInstance 
  extends Model<EmployeeAttributes, EmployeeCreationAttributes>, 
  EmployeeAttributes {
  toJSON(): Omit<EmployeeAttributes, 'password'>
}

const Employee: CustomModel<EmployeeInstance> = db.sequelize.define('Employee', {
  employeeId: {
    type: DataTypes.UUID,
    field: 'employee_id',
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
  },
  position: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
  createdAt: {
    type: DataTypes.DATE,
    field: 'created_at',
  },
  updatedAt: {
    type: DataTypes.DATE,
    field: 'updated_at',
  },
}, {
  tableName: 'employee',
  schema: 'meeting',
});

Employee.associate = (models) => {
  Employee.hasMany(models.Reservation, { 
    sourceKey: 'employeeId',
    foreignKey: 'reservedBy',
    as: 'employeeReservations',
  });
};

export default Employee;
