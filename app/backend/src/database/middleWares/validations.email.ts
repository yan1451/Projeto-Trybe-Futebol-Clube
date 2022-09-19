import { Request, Response, NextFunction } from 'express';

export default class ValidationEmail {
  public static email = (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    if (!email) {
      return res.status(400).send({ message: 'All fields must be filled' });
    }
    next();
  };
}
