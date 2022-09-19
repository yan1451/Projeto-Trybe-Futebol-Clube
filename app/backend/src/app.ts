import * as express from 'express';
import routerLogin from './database/routes/Login';
import RouterMatches from './database/routes/Matches';
import RouterTeams from './database/routes/Teams';
import leaderBoardRouter from './database/routes/leaderBoard';

class App {
  public app: express.Express;
  // ...

  constructor() {
    // ...
    this.app = express();
    this.config();
    // ...
  }

  private config(): void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
    this.app.use(express.json());
    this.app.use('/login', routerLogin);
    this.app.use('/teams', RouterTeams);
    this.app.use('/matches', RouterMatches);
    this.app.use('/leaderboard', leaderBoardRouter);

    // ...
  }

  // ...
  public start(PORT: string | number): void {
    // ...
    this.app.listen(PORT);
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
