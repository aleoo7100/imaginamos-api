import {Router, Request, Response} from 'express';
import {login,registro,profile} from '../controllers/auth.controller';
import { checkLogin, checkRegistro } from '../middlewares/formatValidator.middleware';


const router: Router = Router();

router.post('/api/v1/registro',checkRegistro,registro);
router.post('/api/v1/login',checkLogin,login);

export default router;