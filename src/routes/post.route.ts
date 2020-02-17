import {Router, Request, Response} from 'express';
import {createPost, listarPost, destroyPost,listarPostsById} from '../controllers/post.controller';
import { checkToken } from '../middlewares/auth.middleware';


const router: Router = Router();

router.get('/api/v1/posts',checkToken,listarPost);
router.get('/api/v1/posts/:id',checkToken,listarPostsById);
router.post('/api/v1/post',checkToken,createPost);
router.delete('/api/v1/post/:id',checkToken,destroyPost);

export default router;