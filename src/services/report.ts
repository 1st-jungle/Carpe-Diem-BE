import { Op, Sequelize } from 'sequelize';
import Logger from '../loaders/logger';
import db from '../models';

const Card = db.card;

const getReport = async (userId, callback) => {
    await Card.findAll({
        attributes: [
            [Sequelize.fn('date', Sequelize.col('created_at')), 'created_date'],
            'expression_label',
            [Sequelize.fn('count', Sequelize.col('expression_label')), 'expression_label_count'],
        ],
        where: {
            user_id: userId,
            created_at: {
                [Op.between]: [Sequelize.fn('date_sub', Sequelize.fn('now'), Sequelize.literal('INTERVAL 6 DAY')), Sequelize.fn('now')],
            },
        },
        group: ['created_date', 'expression_label'],
        order: [['created_date', 'ASC']],
    })
        .then((result) => {
            Logger.info(`[getReport]${result}`);
            callback(null, result);
        })
        .catch((err) => {
            Logger.error('[getReport]Error', err);
            return callback(err);
        });
};

export default { getReport };
