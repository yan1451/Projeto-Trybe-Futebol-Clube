import { Model, INTEGER } from 'sequelize';
import db from '.';
import Team from './teams';

class Matche extends Model {
  id!: number;

  homeTeam!: number;

  homeTeamGoals: number;

  awayTeam: number;

  awayTeamGoals: number;

  inProgress: boolean;

  dataValues: any;
}

Matche.init({
  homeTeam: { type: INTEGER },
  homeTeamGoals: { type: INTEGER },
  awayTeam: { type: INTEGER },
  awayTeamGoals: { type: INTEGER },
  inProgress: { type: INTEGER },
}, {
  timestamps: false,
  sequelize: db,
  underscored: true,
  modelName: 'matches',
});

Team.belongsTo(Matche, { foreignKey: 'id', as: 'teamHome' });
Team.belongsTo(Matche, { foreignKey: 'id', as: 'teamAway' });

Matche.belongsTo(Team, { foreignKey: 'home_team', as: 'teamHome' });
Matche.belongsTo(Team, { foreignKey: 'away_team', as: 'teamAway' });

export default Matche;
