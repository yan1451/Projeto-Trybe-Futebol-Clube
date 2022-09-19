import { Request, Response } from 'express';
import { Message } from '../interfaces/message';
import tokenValidator from '../services/tokenValidator';

export default class LoginValidate {
  verifyLogin = async (req: Request, res: Response): Promise<Response | undefined> => {
    const token = req.headers.authorization;
    if (token) {
      const valid = await tokenValidator.validatorToken(token) as string | Message;
      if (valid) {
        return res.status(200).json(valid);
      }
    }
    res.status(401).json({ message: 'token is required' });
  };
}
