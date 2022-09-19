import { Model, STRING } from 'sequelize';
import db from '.';
import { DataValues } from '../interfaces/dataValues';

class Users extends Model {
  id!: number;

  username!: string;

  role!: string;

  email!: string;

  password!: string;

  dataValues: DataValues;
}

Users.init({
  username: { type: STRING },
  role: { type: STRING },
  email: { type: STRING },
  password: { type: STRING },
}, {
  timestamps: false,
  sequelize: db,
  modelName: 'users',
});

export default Users;
