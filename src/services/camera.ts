import 'reflect-metadata';
import { Service, Inject } from 'typedi';
import Logger from '../loaders/logger';
import AWS from 'aws-sdk';
import fs from 'fs';

import config from '../config';

@Service()
export default class CameraService {
    public async uploadVideo(file): Promise<any> {
        const logger = Logger;
        const s3 = new AWS.S3({
            accessKeyId: config.aws.access_key_id,
            secretAccessKey: config.aws.secret_access_key,
            region: config.aws.region,
        });
        const fileStream = fs.createReadStream(file.path);

        const params = {
            Bucket: config.aws.bucket_name,
            Key: file.originalname,
            Body: fileStream,
        };

        s3.upload(params, (err, data) => {
            console.log('data', data);
            if (err) {
                logger.error(err);
                throw err;
            }
            logger.info(`File uploaded successfully. ${data.Location}`);
        });
    }

    public async getObjectUrl(bucketName: string, folderName: string): Promise<string[]> {
        const s3 = new AWS.S3({
            accessKeyId: config.aws.access_key_id,
            secretAccessKey: config.aws.secret_access_key,
            region: config.aws.region,
        });

        try {
            const params = {
                Bucket: bucketName,
                Prefix: folderName,
            };

            // Call the listObjectsV2 method of the S3 service object
            const data = await s3.listObjectsV2(params).promise();

            // Get the URLs of the objects in the specific folder
            const objectUrls = data.Contents.map((item) => {
                const objectParams = {
                    Bucket: bucketName,
                    Key: item.Key,
                };

                return s3.getSignedUrl('getObject', objectParams);
            });

            return objectUrls;
        } catch (error) {
            console.error(error);
        }
    }
}
