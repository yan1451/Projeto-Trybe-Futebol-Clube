import { Request, Response } from 'express';
import MatchesService from '../services/matches';
import tokenValidator from '../services/tokenValidator';
import vUndefinedTeam from '../services/undefinedTeams';

export default class MatchesController {
  getALL = async (req: Request, res: Response): Promise<Response> => {
    const TrueOrFalse: string = req.query.inProgress as string;
    const allMatches = await MatchesService.findAllMatches();
    if (TrueOrFalse) {
      const filter = await MatchesService.filterQuery(TrueOrFalse);
      return res.status(200).json(filter);
    }
    return res.status(200).json(allMatches);
  };

  createMatches = async (req: Request, res: Response): Promise<Response> => {
    const token = req.headers.authorization;
    if (token) {
      const valid = await tokenValidator.validatorToken(token);
      console.log(valid);
      if (!valid) {
        return res.status(401).json({ message: 'Unauthorized user' });
      }
      const existTeam = await vUndefinedTeam.undefinedTeam(req.body);
      console.log(existTeam);
      if (existTeam) {
        const createdMatche = await MatchesService.createMatches(req.body);
        return res.status(201).json(createdMatche);
      } return res.status(404).json({ message: 'There is no team with such id!' });
    }
    return res.status(500).json({ message: 'token is required!' });
  };

  finishMatch = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const finishedMatch = await MatchesService.finishMatcher(JSON.parse(id));
    if (finishedMatch.find((number) => number) === undefined) {
      return res.status(400).json({ message: 'Esta partida ja foi finalizada' });
    }
    return res.status(200).json({ message: 'Jogo finalizado com sucesso!' });
  };

  updatedMatche = async (req: Request, res: Response): Promise<Response> => {
    const token = req.headers.authorization;
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    if (token) {
      const valid = await tokenValidator.validatorToken(token);
      console.log(valid);
      if (typeof valid === 'string') {
        const matcheUpdated = await MatchesService
          .updateMatches(JSON.parse(id), homeTeamGoals, awayTeamGoals);

        return res.status(200).json(matcheUpdated);
      }
      return res.status(401).json({ message: 'Unauthorized user' });
    }
    return res.status(500).json({ message: ' token is required ' });
  };
}
