import AWS from 'aws-sdk';
import config from '../config';

// Set the region
AWS.config.update({ accessKeyId: config.aws.access_key_id, secretAccessKey: config.aws.secret_access_key });

// Create an S3 service object
const s3 = new AWS.S3();

const getObjectUrl = async (bucketName, folderName) => {
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
};

getObjectUrl(config.aws.bucket_name, 'album-video/HSH/20230206/').then(console.log);
