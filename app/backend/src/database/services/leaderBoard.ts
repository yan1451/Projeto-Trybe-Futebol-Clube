import sequelize = require('sequelize');
import { IladeBoard } from '../interfaces/leaderBoard';
import Matches from '../models/matche';
import Team from '../models/teams';

// http://download.nust.na/pub6/mysql/doc/refman/4.1/pt/cast-functions.html
// https://sequelize.org/docs/v6/other-topics/sub-queries/
const homeQuerys = {
  query1: 'DISTINCT(team_name)',
  query2: `CAST(SUM(CASE WHEN home_team_goals > away_team_goals THEN 3
  WHEN home_team_goals < away_team_goals THEN 0 else 1 end) as unsigned integer)`,
  query3: 'COUNT(home_team)',
  query4: `CAST(sum(CASE WHEN home_team_goals > away_team_goals THEN 1 else 0 end) 
as unsigned integer)`,
  query5: `CAST(sum(CASE WHEN home_team_goals = away_team_goals THEN 1 else 0 end) 
as unsigned integer )`,
  query6: `CAST(sum(CASE WHEN home_team_goals < away_team_goals THEN 1 else 0 end)
 as unsigned integer)`,
  query7: 'CAST(sum(home_team_goals) as unsigned integer)',
  query8: 'CAST(sum(away_team_goals) as unsigned integer)',
  query9: `CAST(CAST((sum(home_team_goals) - sum(away_team_goals)) 
as unsigned integer) as signed)`,
};

const AwayQuerys = {
  query1: 'DISTINCT(team_name)',
  query2: `CAST(SUM(CASE WHEN away_team_goals > home_team_goals THEN 3
  WHEN away_team_goals < home_team_goals THEN 0 else 1 end) as unsigned integer)`,
  query3: 'COUNT(away_team)',
  query4: `CAST(sum(CASE WHEN away_team_goals > home_team_goals THEN 1 else 0 end) 
as unsigned integer)`,
  query5: `CAST(sum(CASE WHEN away_team_goals = home_team_goals THEN 1 else 0 end) 
as unsigned integer )`,
  query6: `CAST(sum(CASE WHEN away_team_goals < home_team_goals THEN 1 else 0 end)
 as unsigned integer)`,
  query7: 'CAST(sum(away_team_goals) as unsigned integer)',
  query8: 'CAST(sum(home_team_goals) as unsigned integer)',
  query9: `CAST(CAST((sum(away_team_goals) - sum(home_team_goals)) 
as unsigned integer) as signed)`,
};

const teamHome = {
  model: Team,
  as: 'teamHome',
  attributes: { exclude: ['id', 'teamName'] },
};
const teamAway = {
  model: Team,
  as: 'teamAway',
  attributes: { exclude: ['id', 'teamName'] },
};

function Ordenation(a: IladeBoard, b: IladeBoard) {
  let p = b.totalPoints - a.totalPoints;
  if (p === 0) {
    p = b.totalVictories - a.totalVictories;
    if (p === 0) {
      p = b.goalsBalance - a.goalsBalance;
      if (p === 0) {
        p = b.goalsFavor - a.goalsFavor;
        if (p === 0) {
          p = b.goalsOwn - a.goalsOwn;
        }
      }
    }
  }
  return p;
}

export default class LeaderbordService {
  public static getHomeLeaderBoard = async (): Promise<IladeBoard[]> => {
    const getStandings = await Matches.findAll({
      where: { inProgress: false },
      include: teamHome,
      attributes: [
        [sequelize.literal(homeQuerys.query1), 'name'],
        [sequelize.literal(homeQuerys.query2), 'totalPoints'],
        [sequelize.literal(homeQuerys.query3), 'totalGames'],
        [sequelize.literal(homeQuerys.query4), 'totalVictories'],
        [sequelize.literal(homeQuerys.query5), 'totalDraws'],
        [sequelize.literal(homeQuerys.query6), 'totalLosses'],
        [sequelize.literal(homeQuerys.query7), 'goalsFavor'],
        [sequelize.literal(homeQuerys.query8), 'goalsOwn'],
        [sequelize.literal(homeQuerys.query9), 'goalsBalance'],
      ],
      group: ['home_team'],
    });
    const standings = getStandings.map((m) => m.dataValues);
    return standings;
  };

  public static orderHomeLeaderBoard = async (): Promise<IladeBoard[]> => {
    const getStandings = await this.getHomeLeaderBoard();
    const newStandings = getStandings.map((m) => ({
      ...m,
      efficiency: JSON.parse(((m.totalPoints / (m.totalGames * 3)) * 100).toFixed(2)),
    })) as unknown as IladeBoard[];
    return newStandings.sort(Ordenation);
  };

  public static getAwayLeaderBoard = async (): Promise<IladeBoard[]> => {
    const getStandings = await Matches.findAll({
      where: { inProgress: false },
      include: teamAway,
      attributes: [
        [sequelize.literal(AwayQuerys.query1), 'name'],
        [sequelize.literal(AwayQuerys.query2), 'totalPoints'],
        [sequelize.literal(AwayQuerys.query3), 'totalGames'],
        [sequelize.literal(AwayQuerys.query4), 'totalVictories'],
        [sequelize.literal(AwayQuerys.query5), 'totalDraws'],
        [sequelize.literal(AwayQuerys.query6), 'totalLosses'],
        [sequelize.literal(AwayQuerys.query7), 'goalsFavor'],
        [sequelize.literal(AwayQuerys.query8), 'goalsOwn'],
        [sequelize.literal(AwayQuerys.query9), 'goalsBalance'],
      ],
      group: ['away_team'],
    });
    const standings = getStandings.map((m) => m.dataValues);
    return standings;
  };

  public static orderAwayLeaderBoard = async (): Promise<IladeBoard[]> => {
    const getStandings = await this.getAwayLeaderBoard();
    const newStandings = getStandings.map((m) => ({
      ...m,
      efficiency: JSON.parse(((m.totalPoints / (m.totalGames * 3)) * 100).toFixed(2)),
    })) as unknown as IladeBoard[];
    return newStandings.sort(Ordenation);
  };

  public static getGeralLeaderBoar = async (): Promise<IladeBoard[]> => {
    const homeTeams = await this.getHomeLeaderBoard();
    const awayTeams = await this.getAwayLeaderBoard();

    const newArray = homeTeams.map((soma) => {
      const repetido = awayTeams.find((e) => e.name === soma.name);
      if (repetido) {
        repetido.totalPoints += soma.totalPoints;
        repetido.totalGames += soma.totalGames;
        repetido.totalVictories += soma.totalVictories;
        repetido.totalDraws += soma.totalDraws;
        repetido.totalLosses += soma.totalLosses;
        repetido.goalsFavor += soma.goalsFavor;
        repetido.goalsOwn += soma.goalsOwn;
        repetido.goalsBalance += soma.goalsBalance;
        repetido.efficiency = JSON.parse(((repetido.totalPoints / (repetido.totalGames * 3)) * 100)
          .toFixed(2));
      } return repetido;
    }) as IladeBoard[];
    return newArray.sort(Ordenation);
  };
}
