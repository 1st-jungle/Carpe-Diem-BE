import { Op } from 'sequelize';

import Logger from '../loaders/logger';
import db from '../models';

const Friend = db.friend;
const FriendRequest = db.friendRequest;
const User = db.user;

const getFriendList = async (userEmail, callback) => {
    await Friend.findAll({ where: { user_email: userEmail } })
        .then(async (result) => {
            const friendEmails = result.map((r) => r.friendEmail);

            const friends = await User.findAll({
                attributes: ['user_id', 'email', 'nickname', 'profile_img'],
                where: { email: { [Op.in]: friendEmails } },
            });

            Logger.info(`Success! ${friends}`);
            callback(null, friends);
        })
        .catch((err) => {
            Logger.error(err);
            return callback(err);
        });
};

const postFriend = (friendDto, callback) => {
    FriendRequest.create({
        sendEmail: friendDto.send_email,
        receiveEmail: friendDto.receive_email,
        check: friendDto.check,
    })
        .then((result) => {
            Logger.info(`Success! ${result}`);
            callback(null, 'CREATE FRIEND REQUEST OK');
        })
        .catch((err) => {
            Logger.error(err);
            return callback(err);
        });
};

const deleteFriend = async (deleteEmail, callback) => {
    console.log(deleteEmail[0], deleteEmail[1]);

    await Friend.destroy({ where: { user_email: deleteEmail[0], friend_email: deleteEmail[1] } })
        .then(async (result) => {
            await Friend.destroy({ where: { user_email: deleteEmail[1], friend_email: deleteEmail[0] } })
                .then((result) => {
                    Logger.info(`Success! ${result}`);
                    callback(null, 'DELETE FRIEND OK');
                })
                .catch((err) => {
                    Logger.error(err);
                    return callback(err);
                });
        })
        .catch((err) => {
            Logger.error(err);
            return callback(err);
        });
};

const getSendRequestList = async (userEmail, callback) => {
    await FriendRequest.findAll({ where: { send_email: userEmail } })
        .then(async (result) => {
            const receiveEmails = result.map((r) => r.receiveEmail);

            const receiver = await User.findAll({
                attributes: ['user_id', 'email', 'nickname', 'profile_img'],
                where: { email: { [Op.in]: receiveEmails } },
            });

            Logger.info(`Success! ${receiver}`);
            callback(null, receiver);
        })
        .catch((err) => {
            Logger.error(err);
            return callback(err);
        });
};

const getReceiveRequestList = async (userEmail, callback) => {
    await FriendRequest.findAll({ where: { receive_email: userEmail } })
        .then(async (result) => {
            const sendEmails = result.map((r) => r.sendEmail);

            const receiver = await User.findAll({
                attributes: ['user_id', 'email', 'nickname', 'profile_img'],
                where: { email: { [Op.in]: sendEmails } },
            });

            Logger.info(`Success! ${receiver}`);
            callback(null, receiver);
        })
        .catch((err) => {
            Logger.error(err);
            return callback(err);
        });
};

const putChoiceRequest = async (putRequestFriend, callback) => {
    const receive_email = putRequestFriend[0];
    const send_email = putRequestFriend[1];
    const check = putRequestFriend[2];

    if (check == 1) {
        Friend.create({
            userEmail: send_email,
            friendEmail: receive_email,
        })
            .then((result) => {
                Friend.create({
                    userEmail: receive_email,
                    friendEmail: send_email,
                })
                    .then(async (result) => {
                        await FriendRequest.destroy({ where: { send_email: send_email, receive_email: receive_email } })
                            .then((result) => {
                                Logger.info(`Success! ${result}`);
                                callback(null, 'ACCEPT FRIEND REQUEST AND DELETE FRIEND REQUEST OK');
                            })
                            .catch((err) => {
                                Logger.error(err);
                                return callback(err);
                            });
                    })
                    .catch((err) => {
                        Logger.error(err);
                        return callback(err);
                    });
            })
            .catch((err) => {
                Logger.error(err);
                return callback(err);
            });
    } else if (check == 2) {
        await FriendRequest.destroy({ where: { send_email: send_email, receive_email: receive_email } })
            .then((result) => {
                Logger.info(`Success! ${result}`);
                callback(null, 'DELETE FRIEND REQUEST OK');
            })
            .catch((err) => {
                Logger.error(err);
                return callback(err);
            });
    }
};

export default { getFriendList, deleteFriend, getSendRequestList, getReceiveRequestList, postFriend, putChoiceRequest };
