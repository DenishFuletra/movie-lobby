import { Router, Request, Response } from 'express';
import UserController from '../../controllers/user.controller';
import { loginValidator } from '../../middleware/validator';

const user = (router: Router) => {
    router.post('/lobby/login', loginValidator, async (req: Request, res: Response) => {
        const userController = new UserController();
        const response = await userController.login(req.body);
        return res.status(response.status).send(response);
    });
};

export default user;
