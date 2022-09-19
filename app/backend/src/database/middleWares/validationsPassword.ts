import { Request, Response, NextFunction } from 'express';

export default class ValidationsPassword {
  public static password = (req: Request, res: Response, next: NextFunction) => {
    const { password } = req.body;

    if (!password) {
      return res.status(400).send({ message: 'All fields must be filled' });
    }
    if (password.length < 6) {
      return res.status(422).send({ error: 'Errorrrr' });
    }
    next();
  };
}
