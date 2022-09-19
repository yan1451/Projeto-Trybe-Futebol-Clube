import { Request, Response } from 'express';
import { ITeams } from '../interfaces/Iteams';
import TeamsService from '../services/teams';

export default class TeamsController {
  getALL = async (req: Request, res: Response): Promise<Response> => {
    const allTeams = await TeamsService.findAllTeams();
    return res.status(200).json(allTeams);
  };

  getAllById = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params as ITeams;
    if (id) {
      const findById = await TeamsService.findId(id);
      return res.status(200).json(findById);
    }
    return res.status(404).json({ message: 'id is required!' });
  };
}
