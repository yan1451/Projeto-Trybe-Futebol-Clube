import fs = require('fs');
import { Request, Response } from 'express';
import jwt = require('jsonwebtoken');
import { IUser } from '../interfaces/Iuser';
import LoginService from '../services/login';

export default class LoginController {
  createUser = async (req: Request, res: Response): Promise<Response | undefined> => {
    const { email, password } = req.body as IUser;
    const jwtConfig = {
      expiresIn: '1d',
    };
    const SECRET = fs.readFileSync('./jwt.evaluation.key', 'utf8');
    if (email && password) {
      const user = await LoginService.Login(email, password) as IUser;
      const token = jwt.sign({ payload: { user } }, SECRET, jwtConfig);
      if (user.message) {
        return res.status(401).send({ message: 'Incorrect email or password' });
      }
      return res.status(200).json({ user, token });
    }
  };
}
