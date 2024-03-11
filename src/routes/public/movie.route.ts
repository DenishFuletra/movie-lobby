import { Router, Request, Response } from 'express';
import MovieController from '../../controllers/movie.controller';
import express from 'express';
const router = express.Router();

const movie = (router: Router) => {
    router.get('/movie/getAllMovies', async (req: Request, res: Response) => {
        const movieController = new MovieController();
        const response = await movieController.getAllMovies();
        return res.status(response.status).send(response);
    });

    router.get('/movie/searchMovies', async (req: Request, res: Response) => {
        const movieController = new MovieController();
        const searchQuery = req.query.search as string;
        const response = await movieController.searchMovies(searchQuery);
        return res.status(response.status).send(response);
    });
};

export default movie;
