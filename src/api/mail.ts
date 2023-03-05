import express, { Request, Response } from 'express';

import statusCode from '../common/constant/statusCode';
import responseMessage from '../common/constant/responseMessage';
import fs from 'fs';

import mailSender from '../loaders/mail';

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

route.post('/', (req: Request, res) => {
    console.log(req.body);
    const email = req.body.email;
    const friend = req.body.friend;
    const expression = req.body.expression;
    const base64Data = req.body.image.replace(/^data:image\/jpeg;base64,/, '');
    let comment = "";
    switch (expression){
        case "happy" :
            comment = "나 행복했어😊, 무슨 일이 있었냐면.....";
            break;
        case "sad" :
            comment = "나 슬펐어😥, 위로해줘.";
            break;
        case "angry" :
            comment = "나 짜증났어😣, 매운거 먹으러 가자!";
            break;
        case "surprised" :
            comment = "나 놀랐어😮, 무슨 일인지 물어봐줘.";
            break;
        case "disgusted" :
            comment = "나 힘들었어😔, 맛있는거 먹으러 가자!";
            break;
        case "fearful" :
            comment = "나 무서웠어😨, 같이 있어줘.";
            break;
        default :
            comment = `${req.user.nickname}님의 감정 레포트를 확인해보세요!`;
    }
    fs.writeFile('expressions_report.jpeg', base64Data, 'base64', function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log(email, 'expressions_report.jpeg');
            const emailParam = {
                toEmail: email, // 수신할 이메일

                subject: `[CarpeDiem] ${friend} 회원님! ${req.user.nickname}님께서 감정 리포트를 공유하셨습니다.`, // 메일 제목
                html:  `<div>${comment}</div>`,
                attachments: [
                    {
                        filename: 'expressions_report.jpeg',
                        path: 'expressions_report.jpeg',
                    },
                ],
            };
            mailSender.sendGmail(emailParam);

            res.status(statusCode.OK).send('성공');
        }
    });
});

export default route;
