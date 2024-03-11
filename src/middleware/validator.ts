import { body } from 'express-validator';
import { validationResponse } from '../middleware/middleware';

export const bodyValidation = {
    email: body('email', 'Not valid email address.').isString(),
    password: body('password', 'Password Must be string, Can not empty.').isString()
};

export const loginValidator = [bodyValidation.email, bodyValidation.password, validationResponse];
