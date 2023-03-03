// import ExpressionModel from '../models';
import { Op, Sequelize } from 'sequelize';
import Logger from '../loaders/logger';
import db from '../models';

const Expression = db.expression;
const Card = db.card;
const Usim = db.usim;

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

const getVideo = async (userId, callback) => {
    await Card.findAll({
        where: {
            [Op.and]: [
                { user_id: userId },
                Sequelize.literal('created_at BETWEEN DATE_SUB(NOW(), INTERVAL 15 HOUR) AND DATE_ADD(NOW(), INTERVAL 9 HOUR)'),
            ],
        },
        order: [[Sequelize.literal('created_at'), 'DESC']],
        limit: 5,
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

export default { getVideo, postCamera, getUsim, postUsim };
