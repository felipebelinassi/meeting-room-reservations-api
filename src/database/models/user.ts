import { Sequelize, Model, Optional, DataTypes, ModelCtor } from 'sequelize';
import services from '../../services';

const { authService } = services;

interface UserCreationAttributes extends Optional<UserAttributes, 'userId' | 'createdAt' | 'updatedAt'> {}

interface UserInstance 
  extends Model<UserAttributes, UserCreationAttributes>, 
  UserAttributes {}

export type UserModel = ModelCtor<UserInstance>;


export default (sequelize: Sequelize): UserModel => {
  const User = sequelize.define<UserInstance>('User', {
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

  User.addHook('beforeCreate', async (instance: UserInstance) => {
    const { password } = instance;
    const hashedPassword = await authService.hashPassword(password);
    instance.setDataValue('password', hashedPassword);
  });

  return User;
};
