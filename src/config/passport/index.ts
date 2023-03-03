import passport from 'passport';
import Logger from '../../loaders/logger';
import googleAuth from './googleAuth';

export default (app) => {
    app.use(passport.initialize());
    app.use(passport.session());

    // 사용자 인증 성공 시 호출
    passport.serializeUser(function (user, done) {
        Logger.info('serializeUser', user);
        done(null, user);
    });

    // 사용자 인증 이후, 요청할 때마다 호출
    passport.deserializeUser(function (user, done) {
        done(null, user);
    });

    passport.use('google', googleAuth);

    return passport;
};
