import { Router } from 'express';
import TeamsController from '../controllers/teams';

const router: Router = Router();

router.get('/', new TeamsController().getALL);
router.get('/:id', new TeamsController().getAllById);

export default router;
