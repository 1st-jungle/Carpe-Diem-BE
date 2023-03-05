import express, { Request, Response } from 'express';
import statusCode from '../common/constant/statusCode';
import responseMessage from '../common/constant/responseMessage';
import friendAlbumService from '../services/friendAlbum';

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

// 친구 앨범 목록들
route.get('/:userId', async (req: Request, res: Response) => {
    const userId = req.params.userId;

    friendAlbumService.getFriendAlbums(userId, (err, data) => {
        if (err) res.status(statusCode.INTERNAL_SERVER_ERROR).send({ err: err, message: responseMessage.album.server_error });
        else res.status(statusCode.OK).send(data);
    });
});

// 친구 앨범 안의 카드
route.get('/:userId/:albumId', async (req: Request, res: Response) => {
    // 앨범 기본 정보 로드
    const albumDto = { user_id: req.params.userId, album_id: req.params.albumId };
    console.log(albumDto);
    friendAlbumService.getFriendAlbum(albumDto, (err, data) => {
        if (err) res.status(statusCode.INTERNAL_SERVER_ERROR).send({ err: err, message: responseMessage.album.server_error });
        const albumData = data.dataValues;

        // 앨범 -> 카드들 로드
        friendAlbumService.getFriendAlbumCard(albumData.cardId, (err, data) => {
            if (err) res.status(statusCode.INTERNAL_SERVER_ERROR).send({ err: err, message: responseMessage.album.server_error });
            const albumCardData = data.map((card) => card.dataValues);
            albumData.cardId = albumCardData;
            res.status(statusCode.OK).send(albumData);
        });
    });
});

export default route;
