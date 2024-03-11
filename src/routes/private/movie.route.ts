import { Router, Request, Response } from 'express';
import MovieController from '../../controllers/movie.controller';
import express from 'express';
const router = express.Router();

const movie = (router: Router) => {
    router.post('/movie/addMovie', async (req: Request, res: Response) => {
        const movieController = new MovieController();
        const response = await movieController.addMovie(req.body);
        return res.status(response.status).send(response);
    });

    router.put('/movie/updateMovie', async (req: Request, res: Response) => {
        const movieController = new MovieController();
        const response = await movieController.updateMovie(req.body);
        return res.status(response.status).send(response);
    });

    router.delete('/movie/deleteMovie', async (req: Request, res: Response) => {
        const movieController = new MovieController();
        const movieId = req.query.id as string;
        const response = await movieController.deleteMovie(movieId);
        return res.status(response.status).send(response);
    });
};

movie(router);
export default router;
