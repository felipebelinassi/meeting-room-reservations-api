import { Model, Optional, DataTypes } from 'sequelize';
import db from './instance';
import services from '../../services';
import Reservation from './reservation';

const { authService } = services;

interface EmployeeCreationAttributes extends Optional<EmployeeAttributes, 'employeeId' | 'createdAt' | 'updatedAt'> {}

interface EmployeeInstance 
  extends Model<EmployeeAttributes, EmployeeCreationAttributes>, 
  EmployeeAttributes {}

const Employee = db.sequelize.define<EmployeeInstance>('Employee', {
  employeeId: {
    type: DataTypes.UUIDV4,
    field: 'employee_id',
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
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
    unique: true,
  },
  position: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
  },
  createdAt: {
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    field: 'updated_at',
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'employee',
  schema: 'meeting',
});

Employee.hasMany(Reservation, {
  sourceKey: 'employeeId',
  foreignKey: 'reservedBy',
});

Employee.addHook('beforeCreate', async (instance: EmployeeInstance) => {
  const { password } = instance;
  const hashedPassword = await authService.hashPassword(password);
  instance.setDataValue('password', hashedPassword);
});

export default Employee;
