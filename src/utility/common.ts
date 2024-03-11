const aesjs = require('aes-js');
import * as crypto from 'crypto';
import jwt from 'jsonwebtoken';

export function encryptPassword(salt: string, password: string) {
    return crypto.createHmac('sha1', salt).update(password).digest('hex');
}

export function checkPassword(password: string, salt: string, hashedPassword: string) {
    //console.log(password, salt, hashedPassword);
    return encryptPassword(salt, password) === hashedPassword;
}

export function generateToken(tokenObj: any) {
    const jwtSecret: any = process.env.JWTSECRET;
    // console.log(jwtSecret);
    return jwt.sign(tokenObj, jwtSecret, { expiresIn: Number(60) * 60 });
}

export function generateRefreshToken(id: string) {
    const jwtSecret: any = process.env.JWTSECRET;
    // console.log(jwtSecret);
    return jwt.sign({ id: id }, jwtSecret);
}
