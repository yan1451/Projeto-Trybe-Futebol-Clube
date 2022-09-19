import { Router } from 'express';
import LeaderboardContoller from '../controllers/leaderboard';

const router: Router = Router();

router.get('/', new LeaderboardContoller().CreateGeralLeaderboard);
router.get('/home', new LeaderboardContoller().CreateHomeLeaderboard);
router.get('/away', new LeaderboardContoller().CreateAwayLeaderboard);

export default router;
