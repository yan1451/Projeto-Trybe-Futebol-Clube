import { Router } from 'express';
import MatchesController from '../controllers/matches';
import vDuplicateTeams from '../middleWares/validation.duplicateTeams';

const router: Router = Router();

router.get('/', new MatchesController().getALL);
router.post('/', vDuplicateTeams.duplicated, new MatchesController().createMatches);
router.patch('/:id/finish', new MatchesController().finishMatch);
router.patch('/:id', new MatchesController().updatedMatche);

export default router;
