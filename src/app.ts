import express from 'express';
import cors from 'cors';
import publicRouter from './routes/public/index.route';
import privateRouter from './routes/private/movie.route';
import { validateToken } from './middleware/middleware';
const app = express();
app.use(express.json());
app.use(cors());

app.use('/public', publicRouter);
app.use('/api', validateToken, privateRouter);

export default app;
