import { Request, Response, NextFunction } from 'express';

export default class DuplicateTeams {
  public static duplicated = (req: Request, res: Response, next: NextFunction) => {
    const { homeTeam, awayTeam } = req.body;
    if (homeTeam === awayTeam) {
      return res.status(401)
        .send({ message: 'It is not possible to create a match with two equal teams' });
    }
    next();
  };
}
