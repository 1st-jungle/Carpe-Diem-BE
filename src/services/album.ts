import { Sequelize } from 'sequelize';
import Logger from '../loaders/logger';
import db from '../models';

const Album = db.album;
const Card = db.card;

const getAlbums = async (userId, page, size, callback) => {
    const offset = page * size;

    await Album.findAndCountAll({ where: { user_id: userId }, offset: offset, limit: size, order: [['createdAt', 'DESC']] })
        .then((result) => {
            const { rows, count } = result;
            Logger.info(`[getAlbums]Success! ${rows}`);
            callback(null, rows);
        })
        .catch((err) => {
            Logger.error('[getAlbums]Error', err);
            return callback(err);
        });
};

const getAlbum = (albumId, callback) => {
    Album.findOne({ where: { album_id: albumId } })
        .then((result) => {
            Logger.info(`[getAlbum]Success! ${result}`);
            return callback(null, result);
        })
        .catch((err) => {
            Logger.error('[getAlbum]Error', err);
            return callback(err);
        });
};

const getAlbumCard = async (cardId, callback) => {
    const cardIdMatchArray = cardId.map((cardId) => {
        return `card_id = ${cardId}`;
    });

    await Card.findAll({ where: Sequelize.literal(cardIdMatchArray.join(' OR ')) })
        .then((result) => {
            Logger.info(`[getAlbumCard]Success! ${result}`);
            callback(null, result);
        })
        .catch((err) => {
            Logger.error('[getAlbumCard]Error', err);
            return callback(err);
        });
};

const postAlbum = (albumDto, callback) => {
    Album.create({
        userId: albumDto.user_id,
        title: albumDto.title,
        cardId: albumDto.card_id,
        coverImgUrl: albumDto.cover_img_url,
    })
        .then((result) => {
            Logger.info(`Success! ${result}`);
            callback(null, '[postAlbum]CREATE ALBUM OK');
        })
        .catch((err) => {
            Logger.error('[postAlbum]Error', err);
            return callback(err);
        });
};

const putAlbum = async (albumDto, callback) => {
    await Album.update(
        {
            userId: albumDto.user_id,
            cardId: albumDto.card_id,
            albumId: albumDto.album_id,
            title: albumDto.title,
            coverImgUrl: albumDto.thumbnail_url,
        },
        { where: { albumId: albumDto.album_id } },
    )
        .then((result) => {
            Logger.info(`[putAlbum]Success! ${result}`);
            callback(null, 'UPDATE ALBUM OK');
        })
        .catch((err) => {
            Logger.error('[putAlbum]Error', err);
            return callback(err);
        });
};

const deleteAlbum = async (albumId, callback) => {
    await Album.destroy({ where: { album_id: albumId } })
        .then((result) => {
            Logger.info(`[deleteAlbum]Success! ${result}`);
            callback(null, 'DELETE ALBUM OK');
        })
        .catch((err) => {
            Logger.error('[deleteAlbum]Error', err);
            return callback(err);
        });
};

const putAlbumShowCheck = async (albumDto, callback) => {
    await Album.update(
        {
            userId: albumDto.user_id,
            cardId: albumDto.card_id,
            albumId: albumDto.album_id,
            title: albumDto.title,
            coverImgUrl: albumDto.thumbnail_url,
            showCheck: albumDto.show_check,
        },
        { where: { albumId: albumDto.album_id } },
    )
        .then((result) => {
            Logger.info(`[putAlbumShowCheck]Success! ${result}`);
            callback(null, 'UPDATE ALBUM Check OK');
        })
        .catch((err) => {
            Logger.error('[putAlbumShowCheck]Error', err);
            return callback(err);
        });
};

export default {
    getAlbums,
    getAlbum,
    getAlbumCard,
    postAlbum,
    putAlbum,
    deleteAlbum,
    putAlbumShowCheck,
};
