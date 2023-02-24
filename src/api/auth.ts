import express, { Request, Response } from 'express';

import expressRequest from '../types/expressRequest';
import config from '../config';
import statusCode from '../common/constant/statusCode';
import responseMessage from '../common/constant/responseMessage';

const route = express.Router();

export default (passport) => {
    route.get('/', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            return res.status(statusCode.OK).send(req.user);
        } else {
            res.status(statusCode.UNAUTHORIZED).send({ message: responseMessage.auth.logout });
        }
    });
    route.get('/signout', (req: Request, res: Response, next: any) => {
        req.logout(function (err) {
            if (err) {
                return next(err);
            }
            res.redirect('/auth');
        });
    });
    route.get(
        '/google',
        passport.authenticate('google', {
            scope: ['https://www.googleapis.com/auth/plus.login', 'email'],
        }),
    );
    route.get(
        '/google/callback',
        passport.authenticate('google', {
            failureRedirect: '/google',
        }),
        (req: Request, res: Response) => {
            res.redirect(`http://${config.client.host}:${config.client.port}`);
        },
    );
    return route;
};
