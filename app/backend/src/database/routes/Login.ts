import { Router } from 'express';
import Login from '../controllers/login';
import VPassword from '../middleWares/validationsPassword';
import VEmail from '../middleWares/validations.email';
import LoginValidate from '../controllers/loginValidate';

const router: Router = Router();

router.post('/', VEmail.email, VPassword.password, new Login().createUser);
router.get('/validate', new LoginValidate().verifyLogin);

export default router;
