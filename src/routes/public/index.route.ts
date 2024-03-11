import express from 'express';
const router = express.Router();

import User from './user.route';
User(router);

import Movie from './movie.route';
Movie(router);

export default router;
