import { Imatches } from '../interfaces/IMatches';
import Team from '../models/teams';

export default class UndefinedTeams {
  public static undefinedTeam = async (body: Imatches) => {
    const { homeTeam, awayTeam } = body;
    const existeHomeTeam = await Team.findOne({ where: { id: homeTeam } });
    const existAwayTeam = await Team.findOne({ where: { id: awayTeam } });
    if (existeHomeTeam && existAwayTeam) {
      return true;
    }
    return false;
  };
}
