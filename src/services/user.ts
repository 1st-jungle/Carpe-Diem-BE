import Logger from '../loaders/logger';
import db from '../models';

const User = db.user;

const getUserInfo = async (userId, callback) => {
    await User.findOne({ where: { user_id: userId } })
        .then((result) => {
            Logger.info(`[getUserInfo]Success! ${result}`);
            callback(null, result);
        })
        .catch((err) => {
            Logger.error('[getUserInfo]Error', err);
            return callback(err);
        });
};

const putUserInfo = async (userDto, callback) => {
    await User.update(
        {
            userId: userDto.user_id,
            nickname: userDto.nickname,
            email: userDto.email,
        },
        { where: { userId: userDto.user_id } },
    )
        .then((result) => {
            Logger.info(`[putUserInfo]Success! ${result}`);
            callback(null, 'UPDATE USER OK');
        })
        .catch((err) => {
            Logger.error('[putUserInfo]Error', err);
            return callback(err);
        });
};

const getFriendUserInfo = async (friendEmail, callback) => {
    await User.findOne({ where: { email: friendEmail } })
        .then((result) => {
            Logger.info(`[getFriendUserInfo]Success! ${result}`);
            callback(null, result);
        })
        .catch((err) => {
            Logger.error('[getFriendUserInfo]Error', err);
            return callback(err);
        });
};

const getAllUserInfo = async (userId, callback) => {
    await User.findAll()
        .then((result) => {
            Logger.info(`[getAllUserInfo]Success! ${result}`);
            callback(null, result);
        })
        .catch((err) => {
            Logger.error('[getAllUserInfo]Error', err);
            return callback(err);
        });
};

export default { getUserInfo, putUserInfo, getFriendUserInfo, getAllUserInfo };
