import express, {Aplication} from 'express';
import authRotes from './routes/auth.route';
import postRotes from './routes/post.route';
import userRoutes from './routes/user.route';
import morgan from 'morgan';
import fileUpload from 'express-fileupload';

const app: Aplication = express();

// config
process.env.PORT = process.env.PORT || '4000';
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
process.env.CADUCIDAD_TOKEN = '48h';
process.env.SEED = process.env.SEED || 'este-es-el-secret-dev';


// middleware
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload({createParentPath: true}));
app.use('/uploads', express.static('uploads'));


// routes
app.use(authRotes)
app.use(postRotes)
app.use(userRoutes)


export default app;