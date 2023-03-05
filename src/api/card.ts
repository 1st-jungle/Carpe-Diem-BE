import express, { Request, Response } from 'express';

import statusCode from '../common/constant/statusCode';
import responseMessage from '../common/constant/responseMessage';
import cardService from '../services/card';
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

    const pageAsNumber = Number.parseInt(req.query.page as string);
    const sizeAsNumber = Number.parseInt(req.query.size as string);

    let page = 0;
    if (!Number.isNaN(pageAsNumber) && pageAsNumber >= 0) page = pageAsNumber;

    let size = 12;
    if (!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0 && sizeAsNumber < 13) size = sizeAsNumber;

    cardService.getCards(userId, page, size, (err, data) => {
        if (err) res.status(statusCode.INTERNAL_SERVER_ERROR).send({ err: err, message: responseMessage.card.server_error });
        else res.status(statusCode.OK).send(data);
    });
});

route.get('/:cardId', async (req: Request, res: Response) => {
    if (!req.user) return res.status(statusCode.UNAUTHORIZED).json({ message: responseMessage.auth.unauthorized });
    const cardId = req.params.cardId;

    cardService.getCard(cardId, (err, data) => {
        if (err) res.status(statusCode.INTERNAL_SERVER_ERROR).send({ err: err, message: responseMessage.card.server_error });
        else res.status(statusCode.OK).send(data);
    });
});

route.delete('/:cardId', async (req: Request, res: Response) => {
    if (!req.user) return res.status(statusCode.UNAUTHORIZED).json({ message: responseMessage.auth.unauthorized });
    const cardId = req.params.cardId;

    cardService.deleteCard(cardId, (err, data) => {
        if (err) res.status(statusCode.INTERNAL_SERVER_ERROR).send({ err: err, message: responseMessage.card.delete_error });
        else res.status(statusCode.OK).send(data);
    });
});

route.put('/:cardId', async (req: Request, res: Response) => {
    if (!req.user) return res.status(statusCode.UNAUTHORIZED).json({ message: responseMessage.auth.unauthorized });
    const cardDto = req.body;
    console.log(cardDto);

    cardService.putCard(cardDto, (err, data) => {
        if (err) res.status(statusCode.INTERNAL_SERVER_ERROR).send({ err: err, message: responseMessage.card.update_error });
        else res.status(statusCode.OK).send(data);
    });
});

export default route;
