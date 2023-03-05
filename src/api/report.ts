import express, { Request, Response } from 'express';

import statusCode from '../common/constant/statusCode';
import responseMessage from '../common/constant/responseMessage';
import reportService from '../services/report';
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

interface EmotionArray {
    happy: number;
    sad: number;
    surprised: number;
    disgusted: number;
    angry: number;
    fearful: number;
}

const emotionInit: EmotionArray = { happy: 0, sad: 0, surprised: 0, disgusted: 0, angry: 0, fearful: 0 };

route.get('/', async (req: Request, res: Response) => {
    if (!req.user) return res.status(statusCode.UNAUTHORIZED).json({ message: responseMessage.auth.unauthorized });
    const userId = req.user.user_id;

    reportService.getReport(userId, (err, data) => {
        if (err) res.status(statusCode.INTERNAL_SERVER_ERROR).send({ err: err, message: responseMessage.report.server_error });
        else {
            const nowTime = new Date();
            const dateReport = {};

            let newDate = new Date(nowTime.setDate(nowTime.getDate() - 6));
            for (let idx = 0; idx < 7; idx++) {
                const year = newDate.getFullYear();
                const month = newDate.getMonth() + 1 < 10 ? '0' + (newDate.getMonth() + 1) : newDate.getMonth() + 1;
                const date = newDate.getDate() < 10 ? '0' + newDate.getDate() : newDate.getDate();
                dateReport[year + '-' + month + '-' + date] = { ...emotionInit };
                newDate = new Date(nowTime.setDate(nowTime.getDate() + 1));
            }

            data.map((row) => {
                const result = row.dataValues;
                dateReport[result.created_date][result.expression_label] = result.expression_label_count;
            });
            res.status(statusCode.OK).send(dateReport);
        }
    });
});

export default route;
