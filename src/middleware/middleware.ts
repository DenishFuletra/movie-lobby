import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { httpStatus, getErrorResponse, getResponse } from '../utility/response';
import { ResponseMessages } from '../utility/response.message';
import { validationResult } from 'express-validator';

interface CustomRequest extends Request {
    user_data?: any;
}

export const validateToken = (req: CustomRequest, res: Response, next: any) => {
    try {
        const jwtSecret = process.env.JWTSECRET || '';
        if (req.headers.authorization) {
            req.user_data = jwt.verify(req.headers.authorization.split(' ')[1], jwtSecret);
            console.log('User', req.user_data);
            next();
        } else {
            const response = getResponse(httpStatus.UNAUTHORIZED, null, ResponseMessages.Token_Invalid);
            res.status(response.status).send(response);
        }
    } catch (err) {
        const response = getResponse(httpStatus.UNAUTHORIZED, null, ResponseMessages.Token_Invalid);
        res.status(response.status).send(response);
    }
};

export function validationResponse(req: any, res: any, next?: any) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const response = getResponse(httpStatus.BAD_REQUEST, errors.array(), 'Validation Error(s)');
        res.status(response.status).send(response);
        return;
    }
    next();
}
