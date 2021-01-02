import { Model, Optional, DataTypes } from 'sequelize';
import db from './instance';
import services from '../../services';
import Reservation from './reservation';

const { authService } = services;

interface UserCreationAttributes extends Optional<UserAttributes, 'userId' | 'createdAt' | 'updatedAt'> {}

interface UserInstance 
  extends Model<UserAttributes, UserCreationAttributes>, 
  UserAttributes {}

const User = db.sequelize.define<UserInstance>('User', {
  userId: {
    type: DataTypes.UUIDV4,
    field: 'user_id',
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
  tableName: 'user',
  schema: 'meeting',
});

User.hasMany(Reservation, {
  sourceKey: 'userId',
  foreignKey: 'reservedBy',
});

User.addHook('beforeCreate', async (instance: UserInstance) => {
  const { password } = instance;
  const hashedPassword = await authService.hashPassword(password);
  instance.setDataValue('password', hashedPassword);
});

export default User;
