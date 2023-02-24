import express, { Request, Response } from 'express';

import statusCode from '../common/constant/statusCode';
import responseMessage from '../common/constant/responseMessage';
import friendService from '../services/friend';

import cors from 'cors';

const route = express.Router();

route.use(
    cors({
        origin: true,
        credentials: true,
    }),
);
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

route.get('/', (req: Request, res: Response) => {
    if (!req.user) return res.status(statusCode.UNAUTHORIZED).json({ message: responseMessage.auth.unauthorized });

    friendService.getFriendList(req.user.email, (err, data) => {
        if (err) res.status(statusCode.INTERNAL_SERVER_ERROR).send({ err: err, message: responseMessage.friend.email_error });
        else res.status(statusCode.OK).send(data);
    });
});

route.post('/', (req: Request, res: Response) => {
    if (!req.user) return res.status(statusCode.UNAUTHORIZED).json({ message: responseMessage.auth.unauthorized });

    const friendDto = req.body;
    friendDto.send_email = req.user.email;
    friendService.postFriend(friendDto, (err, data) => {
        if (err) res.status(statusCode.INTERNAL_SERVER_ERROR).send({ err: err, message: responseMessage.friend.post_error });
        else res.status(statusCode.OK).send(data);
    });
});

route.delete('/:friendEmail', async (req: Request, res: Response) => {
    if (!req.user) return res.status(statusCode.UNAUTHORIZED).json({ message: responseMessage.auth.unauthorized });
    const deleteEmail = [req.user.email, req.params.friendEmail];

    friendService.deleteFriend(deleteEmail, (err, data) => {
        if (err) res.status(statusCode.INTERNAL_SERVER_ERROR).send({ err: err, message: responseMessage.friend.delete_error });
        else res.status(statusCode.OK).send(data);
    });
});

route.get('/request', (req: Request, res: Response) => {
    if (!req.user) return res.status(statusCode.UNAUTHORIZED).json({ message: responseMessage.auth.unauthorized });

    friendService.getSendRequestList(req.user.email, (err, data) => {
        if (err) res.status(statusCode.INTERNAL_SERVER_ERROR).send({ err: err, message: responseMessage.friend.request_error });
        else res.status(statusCode.OK).send(data);
    });
});

route.get('/receive', (req: Request, res: Response) => {
    if (!req.user) return res.status(statusCode.UNAUTHORIZED).json({ message: responseMessage.auth.unauthorized });

    friendService.getReceiveRequestList(req.user.email, (err, data) => {
        if (err) res.status(statusCode.INTERNAL_SERVER_ERROR).send({ err: err, message: responseMessage.friend.receive_error });
        else res.status(statusCode.OK).send(data);
    });
});

route.put('/request/:friendEmail/:check', (req: Request, res: Response) => {
    if (!req.user) return res.status(statusCode.UNAUTHORIZED).json({ message: responseMessage.auth.unauthorized });

    const putRequestFriend = [req.user.email, req.params.friendEmail, Number(req.params.check)];
    friendService.putChoiceRequest(putRequestFriend, (err, data) => {
        if (err) res.status(statusCode.INTERNAL_SERVER_ERROR).send({ err: err, message: responseMessage.friend.request_choice_error });
        else res.status(statusCode.OK).send(data);
    });
});

export default route;
