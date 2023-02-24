import Logger from '../loaders/logger';
import db from '../models';

const User = db.user;

const getUserInfo = async (userId, callback) => {
    await User.findOne({ where: { user_id: userId } })
        .then((result) => {
            Logger.info(`Success! ${result}`);
            callback(null, result);
        })
        .catch((err) => {
            Logger.error(err);
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
            Logger.info(`Success! ${result}`);
            callback(null, 'UPDATE USER OK');
        })
        .catch((err) => {
            Logger.error(err);
            return callback(err);
        });
};

const getFriendUserInfo = async (friendEmail, callback) => {
    await User.findOne({ where: { email: friendEmail } })
        .then((result) => {
            Logger.info(`Success! ${result}`);
            callback(null, result);
        })
        .catch((err) => {
            Logger.error(err);
            return callback(err);
        });
};

const getAllUserInfo = async (userId, callback) => {
    await User.findAll()
        .then((result) => {
            Logger.info(`Success! ${result}`);
            callback(null, result);
        })
        .catch((err) => {
            Logger.error(err);
            return callback(err);
        });
};

export default { getUserInfo, putUserInfo, getFriendUserInfo, getAllUserInfo };
