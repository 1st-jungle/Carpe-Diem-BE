import 'reflect-metadata';
import { Request } from 'express';
import Logger from './logger';
import multer from 'multer';
import multerS3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3';
import AWS from 'aws-sdk';

import config from '../config';

const s3 = new S3Client({
    region: config.aws.region,
    credentials: {
        accessKeyId: config.aws.access_key_id,
        secretAccessKey: config.aws.secret_access_key,
    },
});

const dateFormat = (now): string => {
    return now.getFullYear() + '_' + (now.getMonth() + 1) + '_' + now.getDate();
};

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: config.aws.bucket_name,
        key: function (req: Request, file, cb) {
            const format = file.originalname.split('.').slice(-1)[0];
            const now = new Date(new Date().getTime() + 540 * 60 * 1000);

            if (!req.user) {
                Logger.error('[S3 upload] Unautorized.');
                return cb(new Error('Unautorized.'));
            }

            // 파일 포맷 유효성 검사
            if (!['webm', 'mp4'].includes(format)) {
                Logger.error('[S3 upload] Invalid file format.');
                return cb(new Error('Only images are allowed'));
            }

            Logger.info(`File uploaded successfully.`);
            cb(null, `album-video/${req.user.user_id}/${dateFormat(now)}/${file.originalname}`);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
});

const uploadImg = multer({
    storage: multerS3({
        s3: s3,
        bucket: config.aws.bucket_name,
        key: function (req: Request, file, cb) {
            const format = file.originalname.split('.').slice(-1)[0];
            if (!req.user) {
                Logger.error('[S3 upload] Unautorized.');
                return cb(new Error('Unautorized.'));
            }

            // 파일 포맷 유효성 검사
            if (!['jpg', 'png', 'gif'].includes(format)) {
                Logger.error('[S3 upload] Invalid file format.');
                return cb(new Error('Only images are allowed'));
            }

            Logger.info(`File uploaded successfully.`);
            cb(null, `user-img/${req.user.user_id}/${file.originalname}`);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
});

const deleteImg = (key) => {
    const s3 = new AWS.S3();
    const params = { Bucket: config.aws.bucket_name, Key: key };

    s3.deleteObject(params, (err, data) => {
        if (err) {
            throw err;
        }
        Logger.info(`delete images successfully!`);
    });
};

export { upload, uploadImg, deleteImg };
