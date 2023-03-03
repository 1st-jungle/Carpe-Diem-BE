import { Sequelize } from 'sequelize';
import Logger from '../loaders/logger';
import db from '../models';

const User = db.user;

const validateUser = (userId, callback) => {
    User.findOne({ where: { userId: userId } })
        .then((result) => {
            Logger.info(`사용자 조회가 정상적으로 처리되었습니다. ${result}`);
            callback(null, result);
        })
        .catch((err) => {
            Logger.error('[validateUser]Error', err);
            return callback(err);
        });
};

const signUp = (userDto, callback) => {
    User.create({
        userId: userDto.user_id,
        email: userDto.email,
        nickname: userDto.nickname,
        profileImg: userDto.profile_img,
    })
        .then((result) => {
            Logger.info(`회원가입이 정상적으로 처리되었습니다. ${result}`);
            callback(null, result);
        })
        .catch((err) => {
            Logger.error('[signUp]Error', err);
            return callback(err);
        });
};

export default { validateUser, signUp };
