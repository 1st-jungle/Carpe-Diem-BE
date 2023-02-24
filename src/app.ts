import express from 'express';
import http from 'http';
import https from 'https';
import cors from 'cors';
import fs from 'fs';
import { Server } from 'socket.io';
import { instrument } from '@socket.io/admin-ui';
import session from 'express-session';
import mysqlSession from 'express-mysql-session';

import Logger from './loaders/logger';
import loaders from './loaders';
import config from './config';

import { PassportDB } from './types/passport';
import Passport from './config/passport';

import authRouter from './api/auth';
import albumRouter from './api/album';
import cameraRouter from './api/camera';
import cardRouter from './api/card';
import friendRouter from './api/friend';
import userRouter from './api/user';

const app = express();
let nodeServer;
let socketServer;

/* Production Env */
if (config.node_env === 'production') {
    const credentials = { key: fs.readFileSync(config.ssl.privateKey), cert: fs.readFileSync(config.ssl.certificate) };
    nodeServer = new https.Server(credentials, app);
    socketServer = new https.Server(credentials, app);
} else {
    nodeServer = new http.Server(app);
    socketServer = new http.Server(app);
}

/* Passport */
const sessionDatabase: PassportDB = {
    host: config.db.host,
    port: config.db.port,
    user: config.db.username,
    password: config.db.password,
    database: config.db.database,
};
const MySqlStore = mysqlSession(session);

app.use(express.json());

app.use(
    cors({
        origin: true,
        credentials: true,
    }),
);

app.use(
    session({
        key: 'session_cookie_name',
        secret: 'session_cookie_secret',
        store: new MySqlStore(sessionDatabase),
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: false,
            maxAge: 24 * 60 * 60 * 1000,
        },
    }),
);

const passport = Passport(app);

/* Router */
app.use('/auth', authRouter(passport));
app.use('/album', albumRouter);
app.use('/card', cardRouter);
app.use('/camera', cameraRouter);
app.use('/friend', friendRouter);
app.use('/user', userRouter);

const startServer = async () => {
    await loaders(app);

    nodeServer
        .listen(config.port, () => {
            Logger.info(`🛡️  Server listening on: http://${config.host}:${config.port} 🛡️`);
        })
        .on('error', (err) => {
            Logger.error(err);
            process.exit(1);
        });
};

startServer();

/* Socket */
const wsServer = new Server(socketServer, {
    cors: {
        origin: '*',
        credentials: true,
    },
});

socketServer.listen(5000, () => {
    console.log(`Listening on port 5000.`);
});

instrument(wsServer, {
    auth: false,
});

wsServer.on('connection', (socket) => {
    console.log(wsServer.sockets.adapter);
    socket.on('join_room', (roomName, done) => {
        socket.join(roomName);
        socket.to(roomName).emit('welcome');
    });

    socket.on('offer', (offer, roomName) => {
        socket.to(roomName).emit('offer', offer);
    });

    socket.on('answer', (answer, roomName) => {
        socket.to(roomName).emit('answer', answer);
    });
    socket.on('ice', (ice, roomName) => {
        socket.to(roomName).emit('ice', ice);
    });
});

export default app;
