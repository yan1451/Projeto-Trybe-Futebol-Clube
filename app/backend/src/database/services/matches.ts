import { literal } from 'sequelize';
import { Imatches } from '../interfaces/IMatches';
import { Message } from '../interfaces/message';
import Matches from '../models/matche';
import Team from '../models/teams';

export default class MatchesService {
  public static findAllMatches = async (): Promise<Matches[]> => {
    const allMatches = await Matches.findAll({
      include: [{
        model: Team,
        as: 'teamHome',
        required: false,
        attributes: ['teamName'],
      },
      {
        model: Team,
        as: 'teamAway',
        required: false,
        attributes: ['teamName'],
      }],
    });
    return allMatches;
  };

  public static filterQuery = async (params: string): Promise<Matches[]> => {
    const TrueOrFalse = JSON.parse(params);
    const filter = await Matches.findAll({
      where: { inProgress: TrueOrFalse },
      include: [{
        model: Team,
        as: 'teamHome',
        required: false,
        attributes: ['teamName'],
      }, {
        model: Team,
        as: 'teamAway',
        required: false,
        attributes: ['teamName'] }],
      attributes: {
        include: [[literal(`CAST
          (IF(in_progress, 'true', 'false') as JSON ) `),
        'inProgress']] } });
    return filter;
  };

  public static createMatches = async (body: Imatches) => {
    const { awayTeam, homeTeam, homeTeamGoals, awayTeamGoals, inProgress } = body;
    const create = await Matches.create(
      { homeTeam, homeTeamGoals, awayTeam, awayTeamGoals, inProgress },
    );
    return create;
  };

  public static finishMatcher = async (id: number) => {
    const updateMatch: Matches[] = await Matches.update(
      { inProgress: false },
      { where: { id } },
    ) as unknown as Matches[];
    return updateMatch;
  };

  public static updateMatches = async (id: number, homeTeamGoals: string, awayTeamGoals: string):
  Promise<Message | Matches | null> => {
    const updateMatch: Matches[] = await Matches.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } },
    ) as unknown as Matches[];
    if (updateMatch.find((a) => a) === undefined) {
      return { message: 'Partida ja Atualizada' };
    }
    const updated = await Matches.findOne({
      where: { id },
      attributes: {
        exclude: [
          'home_team',
          'away_team',
        ],
      },
    });
    return updated;
  };
}
