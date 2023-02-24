import expressLoader from './express';
import db from '../models';
import Logger from './logger';

export default async (expressApp) => {
    await db.sequelize.sync({ force: false }).catch((err) => {
        Logger.error(err);
    });

    Logger.info('✌️ DB loaded and connected!');

    await expressLoader(expressApp);
    Logger.info('✌️ Express loaded!');
};
