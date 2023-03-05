import { Container } from 'typedi';
import express, { Request, Response } from 'express';
import cors from 'cors';
import { upload } from '../loaders/multer';
import { uploadImg } from '../loaders/multer';
import expressRequest from '../types/expressRequest';

import statusCode from '../common/constant/statusCode';
import responseMessage from '../common/constant/responseMessage';
import cameraService from '../services/camera';

const route = express.Router();

route.use(
    cors({
        origin: true,
        credentials: true,
    }),
);
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

route.post('/', upload.single('file'), async (req: Request, res: Response) => {
    if (!req.user) {
        return res.status(statusCode.UNAUTHORIZED).json({ message: responseMessage.auth.unauthorized });
    }
    if (!req.file) {
        return res.status(statusCode.BAD_REQUEST).json({ message: responseMessage.camera.upload_error });
    }

    const userId = req.user.user_id;
    const expressionDto = JSON.parse(req.body.expressionData);
    console.log(expressionDto);
    const videoUrl: string = req.file['key'];
    const thumbnailUrl: string = 'card-thumbnail' + req.file['key'].split('.')[0].replace('album-video', '') + '.jpg';

    expressionDto['videoUrl'] = videoUrl;
    expressionDto['userId'] = userId;
    expressionDto['thumbnailUrl'] = thumbnailUrl;

    cameraService.postCamera(expressionDto, (err, data) => {
        if (err) res.status(statusCode.INTERNAL_SERVER_ERROR).send({ err: err, message: responseMessage.camera.expression_error });
        else res.status(statusCode.OK).send(data);
    });
});

route.get('/', (req: Request, res: Response) => {
    if (!req.user) return res.status(statusCode.UNAUTHORIZED).json({ message: responseMessage.auth.unauthorized });
    const userId = req.user.user_id;

    cameraService.getVideo(userId, (err, data) => {
        if (err) res.status(statusCode.INTERNAL_SERVER_ERROR).send({ err: err, message: responseMessage.camera.video_error });
        else res.status(statusCode.OK).send(data);
    });
});

route.get('/usim', (req: Request, res: Response) => {
    if (!req.user) return res.status(statusCode.UNAUTHORIZED).json({ message: responseMessage.auth.unauthorized });

    const userId = req.user.user_id;
    cameraService.getUsim(userId, (err, data) => {
        if (err) res.status(statusCode.INTERNAL_SERVER_ERROR).send({ err: err, message: responseMessage.camera.usim_error });
        else res.status(statusCode.OK).send(data);
    });
});

route.post('/usim', uploadImg.array('imgs', 3), async (req: Request, res: Response) => {
    if (!req.user) {
        return res.status(statusCode.UNAUTHORIZED).json({ message: responseMessage.auth.unauthorized });
    }
    if (!req.files) {
        return res.status(statusCode.BAD_REQUEST).json({ message: responseMessage.camera.upload_error });
    }

    const userId = req.user.user_id;
    const usimDto = {};
    const imgs = req.files;
    const img1 = imgs[0];
    const img2 = imgs[1];
    const img3 = imgs[2];
    let userImgUrl: string = img1['key'];
    usimDto['userId'] = userId;
    usimDto['userImgUrl'] = userImgUrl;
    cameraService.postUsim(usimDto, (err, data) => {
        if (err) res.status(statusCode.INTERNAL_SERVER_ERROR).send({ err: err, message: responseMessage.camera.expression_error });
        else res.status(statusCode.OK).send(data);
    });
    userImgUrl = img2['key'];
    usimDto['userId'] = userId;
    usimDto['userImgUrl'] = userImgUrl;
    cameraService.postUsim(usimDto, (err, data) => {
        if (err) res.status(statusCode.INTERNAL_SERVER_ERROR).send({ err: err, message: responseMessage.camera.expression_error });
        else res.status(statusCode.OK).send(data);
    });
    userImgUrl = img3['key'];
    usimDto['userId'] = userId;
    usimDto['userImgUrl'] = userImgUrl;
    cameraService.postUsim(usimDto, (err, data) => {
        if (err) res.status(statusCode.INTERNAL_SERVER_ERROR).send({ err: err, message: responseMessage.camera.expression_error });
        else res.status(statusCode.OK).send(data);
    });
});

export default route;
