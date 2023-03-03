// import ExpressionModel from '../models';
import Logger from '../loaders/logger';
import db from '../models';

const Card = db.card;

const getCards = async (userId, page, size, callback) => {
    const offset = page * size;

    await Card.findAndCountAll({ where: { user_id: userId }, offset: offset, limit: size, order: [['createdAt', 'DESC']] })
        .then((result) => {
            const { rows, count } = result;
            Logger.info(`Success! ${rows}`);
            callback(null, rows);
        })
        .catch((err) => {
            Logger.error('[getCards]Error', err);
            return callback(err);
        });
};

const getCard = async (cardId, callback) => {
    await Card.findOne({ where: { card_id: cardId } })
        .then((result) => {
            Logger.info(`[getCard]Success! ${result}`);
            callback(null, result);
        })
        .catch((err) => {
            Logger.error('[getCard]Error', err);
            return callback(err);
        });
};

const deleteCard = async (cardId, callback) => {
    await Card.destroy({ where: { card_id: cardId } })
        .then((result) => {
            Logger.info(`[deleteCard]Success! ${result}`);
            callback(null, 'DELETE CARD OK');
        })
        .catch((err) => {
            Logger.error('[deleteCard]Error', err);
            return callback(err);
        });
};

const putCard = async (cardDto, callback) => {
    await Card.update(
        {
            cardId: cardDto.card_id,
            userId: cardDto.user_id,
            albumId: cardDto.album_id,
            expressionLabel: cardDto.expression_label,
            comment: cardDto.comment,
            thumbnailUrl: cardDto.thumbnail_url,
            videoUrl: cardDto.video_url,
        },
        { where: { cardId: cardDto.card_id } },
    )
        .then((result) => {
            Logger.info(`[putCard]Success! ${result}`);
            callback(null, 'UPDATE CARD OK');
        })
        .catch((err) => {
            Logger.error('[putCard]Error', err);
            return callback(err);
        });
};

export default { getCards, getCard, deleteCard, putCard };
