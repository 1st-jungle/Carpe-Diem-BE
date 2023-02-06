import express from 'express';
import Logger from './loaders/logger';
import loaders from './loaders';
import config from './config';

const startServer = async () => {
    const app = express();
    await loaders({ expressApp: app });

    app.listen(config.port, () => {
        Logger.info(`🛡️  Server listening on: http://${config.host}:${config.port} 🛡️`);
    }).on('error', (err) => {
        Logger.error(err);
        process.exit(1);
    });
};

startServer();
