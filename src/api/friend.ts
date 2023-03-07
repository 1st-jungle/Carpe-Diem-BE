import express, { Request, Response } from 'express';

import statusCode from '../common/constant/statusCode';
import responseMessage from '../common/constant/responseMessage';
import friendService from '../services/friend';

import cors from 'cors';
import { uploadImg } from '../loaders/multer';

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

route.get('/updateImages', (req: Request, res: Response) => {
    console.log('🔥', req.user.user_id);
    if (!req.user) return res.status(statusCode.UNAUTHORIZED).json({ message: responseMessage.auth.unauthorized });

    friendService.getUserImages(req.user.user_id, (err, data) => {
        if (err) res.status(statusCode.INTERNAL_SERVER_ERROR).send({ err: err, message: responseMessage.usim.update_image_error });
        else res.status(statusCode.OK).send(data);
    });
});

route.put('/updateImages', uploadImg.array('imgs', 3), async (req: Request, res: Response) => {
    if (!req.user) return res.status(statusCode.UNAUTHORIZED).json({ message: responseMessage.auth.unauthorized });
    // if (!req.file) return res.status(statusCode.BAD_REQUEST).json({ message: responseMessage.usim.upload_error });

    const usimDto = {};
    const userId = req.user.user_id;

    await friendService.deleteUserImages(userId);

    const img1 = req.files[0];
    const img2 = req.files[1];
    const img3 = req.files[2];

    let userImgUrl: string = img1['key'];

    usimDto['userId'] = userId;
    usimDto['userImgUrl'] = userImgUrl;
    friendService.putUserImages(usimDto, (err, data) => {
        if (err) res.status(statusCode.INTERNAL_SERVER_ERROR).send({ err: err, message: responseMessage.usim.update_image_error });
        else res.status(statusCode.OK).send(data);
    });

    userImgUrl = img2['key'];
    usimDto['userImgUrl'] = userImgUrl;
    friendService.putUserImages(usimDto, (err, data) => {
        if (err) res.status(statusCode.INTERNAL_SERVER_ERROR).send({ err: err, message: responseMessage.usim.update_image_error });
        else res.status(statusCode.OK).send(data);
    });

    userImgUrl = img3['key'];
    usimDto['userImgUrl'] = userImgUrl;
    friendService.putUserImages(usimDto, (err, data) => {
        if (err) res.status(statusCode.INTERNAL_SERVER_ERROR).send({ err: err, message: responseMessage.usim.update_image_error });
        else res.status(statusCode.OK).send(data);
    });
});

route.get('/:friendEmail', (req: Request, res: Response) => {
    console.log(req.params.friendEmail);
    console.log('🌽');

    if (!req.user) return res.status(statusCode.UNAUTHORIZED).json({ message: responseMessage.auth.unauthorized });

    friendService.getFriendLibrary(req.params.friendEmail, (err, data) => {
        if (err) res.status(statusCode.INTERNAL_SERVER_ERROR).send({ err: err, message: responseMessage.friend.friend_library_error });
        else res.status(statusCode.OK).send(data);
    });
});

export default route;
