// import ExpressionModel from '../models';
import { Op, Sequelize } from 'sequelize';
import Logger from '../loaders/logger';
import db from '../models';

const Expression = db.expression;
const Card = db.card;
const Usim = db.usim;
// const ffmpeg = require('fluent-ffmpeg');
const ffmpeg = require('ffmpeg');

const postCamera = async (expressionDto, callback) => {
    const expressionData = {
        userId: expressionDto.userId,
        expressionLabel: expressionDto.expressionLabel,
        expressionValue: expressionDto.expressionValue,
        expressionTime: expressionDto.expressionTime,
        videoUrl: expressionDto.videoUrl,
        thumbnailUrl: expressionDto.thumbnailUrl,
    };
    const expression = await Expression.create(expressionData).catch((err) => {
        Logger.error('[postCameraError', err);
        return callback(err);
    });
    Logger.info(`[postCamera]Success! ${expression}`);
};

const postffmpegCamera = async (expressionDto, callback) => {
    console.log('!!!!!!!!');
    const expressionData = {
        userId: expressionDto.userId,
        expressionLabel: expressionDto.expressionLabel,
        expressionValue: expressionDto.expressionValue,
        expressionTime: expressionDto.expressionTime,
        videoUrl: expressionDto.videoUrl,
        thumbnailUrl: expressionDto.thumbnailUrl,
    };

    // const expression = await Expression.create(expressionData).catch((err) => {
    //     Logger.error('[postffmpegCamera]', err);
    //     return callback(err);
    // });

    let filePath = '';
    console.log(expressionData.videoUrl);

    const srcUrl = 'https://carpe-diem-contents.s3.ap-northeast-2.amazonaws.com/' + expressionData.videoUrl;

    // 썸네일 생성
    // ffmpeg(expressionData.videoUrl)
    //     .on('filenames', function (filenames) {
    //         console.log('Will generate ' + filenames.join(', '));
    //         console.log(filenames);
    //         filePath = 'uploads/thumbnails/' + filenames[0];
    //     })
    //     .on('end', function () {
    //         console.log('Screenshot taken');
    //         console.log(`[postCamera]postffmpegCamera! @${filePath}@ `);
    //         // return res.json({ success: true, url: filePath, fileName: fileNames });
    //     })
    //     .on('error', function (err) {
    //         Logger.error('[postffmpegCamera]', err);
    //         return callback(err);
    //     })
    //     .Screenshot({
    //         count: 3,
    //         folder: 'uploads/thumbnails',
    //         size: '320x240',
    //         fileName: 'thumbnail.jpg',
    //     });

    console.log(Date.now());

    const to_img_file = './imgs/';
    const targetMP4File = '/Users/xxosio/Desktop/study/nmm/Carpe-Diem-BE/src/services/test.mp4';
    const test = '/Users/xxosio/Desktop/study/nmm/Carpe-Diem-BE/src/services/04_51_49.webm';

    console.log(srcUrl);
    try {
        new ffmpeg(test, (err, video) => {
            console.log('inininin');

            if (!err) {
                //비디오 메타정보
                console.log(video.metadata);

                //#0. 이미지 추출 옵션
                let img_option = {
                    start_time: 0,
                    frame_rate: 1,
                    number: video.metadata.duration.seconds,
                    file_name: 'file_%t_%s',
                };
                //#1. 동영상에서 이미지를 추출하기 (비동기 방식)
                video.fnExtractFrameToJPG(to_img_file, img_option, (error, files) => {
                    if (!error) console.log('finish imgs!');
                });
                console.log(Date.now());
            } else {
                console.log('Error: ' + err);
            }
        });
        console.log('ss!');
        console.log(Date.now());
    } catch (e) {
        console.log(e);
        console.log('****************');
        // console.log(e.code);
        // console.log(e.msg);
    }
};

const getVideo = async (userId, callback) => {
    await Card.findAll({
        where: {
            [Op.and]: [
                { user_id: userId },
                Sequelize.literal('created_at BETWEEN DATE_SUB(NOW(), INTERVAL 15 HOUR) AND DATE_ADD(NOW(), INTERVAL 9 HOUR)'),
            ],
        },
        order: [[Sequelize.literal('created_at'), 'DESC']],
        limit: 4,
    })
        .then((result) => {
            Logger.info(`[getVideo]Success! ${result}`);
            callback(null, result);
        })
        .catch((err) => {
            Logger.error('[getVideo]Error', err);
            return callback(err);
        });
};

const getUsim = async (userId, callback) => {
    await Usim.findAll({ attributes: ['userImgUrl'], where: { user_id: userId } })
        .then((result) => {
            Logger.info(`[getUsim]Success! ${result}`);
            callback(null, result);
        })
        .catch((err) => {
            Logger.error('[getUsim]Error', err);
            return callback(err);
        });
};

const postUsim = async (usimDto, callback) => {
    const usimData = {
        userId: usimDto.userId,
        userImgUrl: usimDto.userImgUrl,
    };
    const usim = await Usim.create(usimData).catch((err) => {
        Logger.error('[postUsim]Error', err);
        return callback(err);
    });
    Logger.info(`[postUsim]Success!`, usim);
};

export default { getVideo, postCamera, getUsim, postUsim, postffmpegCamera };
