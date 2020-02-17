import {Router, Request, Response} from 'express';
import {listarAmigo,listarUsuarios, agregarAmigo, eliminarAmigo} from '../controllers/user.controller';
import { checkToken } from '../middlewares/auth.middleware';
import { checkEmail } from '../middlewares/formatValidator.middleware';

const router: Router = Router();

router.get('/api/v1/usuarios',checkToken,listarUsuarios);
router.get('/api/v1/amigos',checkToken,listarAmigo);
router.post('/api/v1/amigo',checkToken,checkEmail,agregarAmigo);
router.delete('/api/v1/amigo/:id',checkToken,eliminarAmigo);

export default router;