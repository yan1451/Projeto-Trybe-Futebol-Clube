import { Model, STRING } from 'sequelize';
import db from '.';

class Team extends Model {
  id!: number;

  teamName: string;
}

Team.init({
  teamName: { type: STRING },
}, {
  timestamps: false,
  sequelize: db,
  underscored: true,
  modelName: 'teams',
});
export default Team;
