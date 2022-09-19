import { Request, Response } from 'express';
import LeaderbordService from '../services/leaderBoard';

export default class LeaderboardContoller {
  CreateHomeLeaderboard = async (_req: Request, res: Response): Promise<Response> => {
    const homeStandings = await LeaderbordService.orderHomeLeaderBoard();
    return res.status(200).json(homeStandings);
  };

  CreateAwayLeaderboard = async (req: Request, res: Response) => {
    const awayStandings = await LeaderbordService.orderAwayLeaderBoard();
    return res.status(200).json(awayStandings);
  };

  CreateGeralLeaderboard = async (req: Request, res: Response) => {
    const geralStandings = await LeaderbordService.getGeralLeaderBoar();
    return res.status(200).json(geralStandings);
  };
}
