import 'reflect-metadata';
import { Request } from 'express';
import Logger from './logger';
import multer from 'multer';
import multerS3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3';

import config from '../config';

const s3 = new S3Client({
    region: config.aws.region,
    credentials: {
        accessKeyId: config.aws.access_key_id,
        secretAccessKey: config.aws.secret_access_key,
    },
});

const dateFormat = (now): string => {
    return now.getFullYear() + '_' + now.getMonth() + '_' + now.getDate();
};

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: config.aws.bucket_name,
        key: function (req: Request, file, cb) {
            const format = file.originalname.split('.').slice(-1)[0];
            const now = new Date();

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

export default upload;
