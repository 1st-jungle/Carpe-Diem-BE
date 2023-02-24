import express, { Request, Response } from 'express';

import statusCode from '../common/constant/statusCode';
import responseMessage from '../common/constant/responseMessage';
import albumService from '../services/album';

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

route.get('/', async (req: Request, res: Response) => {
    if (!req.user) return res.status(statusCode.UNAUTHORIZED).json({ message: responseMessage.auth.unauthorized });
    const userId = req.user.user_id;

    albumService.getAlbums(userId, (err, data) => {
        if (err) res.status(statusCode.INTERNAL_SERVER_ERROR).send({ err: err, message: responseMessage.album.server_error });
        else res.status(statusCode.OK).send(data);
    });
});

route.post('/', async (req: Request, res: Response) => {
    if (!req.user) return res.status(statusCode.UNAUTHORIZED).json({ message: responseMessage.auth.unauthorized });
    const albumDto = req.body;
    albumDto.user_id = req.user.user_id;

    albumService.postAlbum(albumDto, (err, data) => {
        if (err) res.status(statusCode.INTERNAL_SERVER_ERROR).send({ err: err, message: responseMessage.album.create_error });
        else res.status(statusCode.OK).send(data);
    });
});

route.get('/:albumId', async (req: Request, res: Response) => {
    if (!req.user) return res.status(statusCode.UNAUTHORIZED).json({ message: responseMessage.auth.unauthorized });
    const albumId = req.params.albumId;

    // 앨범 기본 정보 로드
    albumService.getAlbum(albumId, (err, data) => {
        if (err) res.status(statusCode.INTERNAL_SERVER_ERROR).send({ err: err, message: responseMessage.album.server_error });
        const albumData = data.dataValues;

        // 앨범 -> 카드들 로드
        albumService.getAlbumCard(albumData.cardId, (err, data) => {
            if (err) res.status(statusCode.INTERNAL_SERVER_ERROR).send({ err: err, message: responseMessage.album.server_error });
            const albumCardData = data.map((card) => card.dataValues);
            albumData.cardId = albumCardData;
            res.status(statusCode.OK).send(albumData);
        });
    });
});

route.delete('/:albumId', async (req: Request, res: Response) => {
    if (!req.user) return res.status(statusCode.UNAUTHORIZED).json({ message: responseMessage.auth.unauthorized });
    const albumId = req.params.albumId;

    albumService.deleteAlbum(albumId, (err, data) => {
        if (err) res.status(statusCode.INTERNAL_SERVER_ERROR).send({ err: err, message: responseMessage.album.server_error });
        else res.status(statusCode.OK).send(data);
    });
});

route.put('/:albumId', async (req: Request, res: Response) => {
    if (!req.user) return res.status(statusCode.UNAUTHORIZED).json({ message: responseMessage.auth.unauthorized });
    let albumDto = req.body;

    albumDto = { album_id: req.params.albumId, ...albumDto };

    albumService.putAlbum(albumDto, (err, data) => {
        if (err) res.status(statusCode.INTERNAL_SERVER_ERROR).send({ err: err, message: responseMessage.album.server_error });
        else res.status(statusCode.OK).send(data);
    });
});

export default route;
