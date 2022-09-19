import Teams from '../models/teams';

export default class TeamService {
  public static findAllTeams = async () => {
    const allTeams = await Teams.findAll();
    return allTeams;
  };

  public static findId = async (id: number) => {
    const findByid = await Teams.findByPk(id);
    return findByid;
  };
}
