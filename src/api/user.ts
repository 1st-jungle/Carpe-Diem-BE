import express, { Request, Response } from 'express';

import statusCode from '../common/constant/statusCode';
import responseMessage from '../common/constant/responseMessage';
import userService from '../services/user';

import cors from 'cors';
import config from '../config';

const route = express.Router();

route.use(
    cors({
        origin: ['http://localhost:3000', `http://${config.client.host}`, `https://${config.client.host}`],
        credentials: true,
    }),
);
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

route.get('/', (req: Request, res: Response) => {
    if (!req.user) return res.status(statusCode.UNAUTHORIZED).json({ message: responseMessage.auth.unauthorized });
    const userId = req.user.user_id;

    userService.getUserInfo(userId, (err, data) => {
        if (err) res.status(statusCode.INTERNAL_SERVER_ERROR).send({ err: err, message: responseMessage.user.user_error });
        else res.status(statusCode.OK).send(data);
    });
});

route.get('/search/:friendEmail', (req: Request, res: Response) => {
    if (!req.user) return res.status(statusCode.UNAUTHORIZED).json({ message: responseMessage.auth.unauthorized });
    const friendEmail = req.params.friendEmail;

    userService.getFriendUserInfo(friendEmail, (err, data) => {
        if (err) res.status(statusCode.INTERNAL_SERVER_ERROR).send({ err: err, message: responseMessage.user.friend_error });
        else res.status(statusCode.OK).send(data);
    });
});

route.get('/all', (req: Request, res: Response) => {
    if (!req.user) return res.status(statusCode.UNAUTHORIZED).json({ message: responseMessage.auth.unauthorized });
    const userId = req.user.user_id;

    userService.getAllUserInfo(userId, (err, data) => {
        if (err) res.status(statusCode.INTERNAL_SERVER_ERROR).send({ err: err, message: responseMessage.user.all_user_error });
        else res.status(statusCode.OK).send(data);
    });
});

export default route;
