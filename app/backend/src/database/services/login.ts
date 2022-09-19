import * as bcrypt from 'bcryptjs';
import { Message } from '../interfaces/message';
import Users from '../models/users';

export default class LoginService {
  static Login = async (email: string, password: string): Promise<Users | Message> => {
    const findUser = await Users.findOne({ where: { email } });
    const emailExistente = findUser?.email;
    console.log(emailExistente);

    if (emailExistente) {
      const passwrd = findUser?.password as string;
      const PasswordTrue = bcrypt.compareSync(password, passwrd);

      if (!PasswordTrue) {
        return ({ message: 'Incorrect email or password' });
      }

      const delet = (x: Users): Users => {
        const elemento = x;
        delete elemento.dataValues.password;
        return elemento;
      };

      const user = delet(findUser);
      return user;
    }
    return ({ message: 'Incorrect email or password' });
  };
}
