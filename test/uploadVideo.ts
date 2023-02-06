import AWS from 'aws-sdk';
import detenv from 'dotenv';
import fs from 'fs';
detenv.config();

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3();

const uploadVideo = async (username, file) => {
    const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: `${username}/${file.name}`,
        Body: file.content,
    };

    try {
        setTimeout(async () => {
            const data = await s3.upload(params).promise();
            console.log(`Successfully uploaded ${file.name} to ${data.Location}`);
        }, 10);
        console.log('시작!');
    } catch (err) {
        console.error(err);
    }
};

const username = 'nickhealthy';
const file = {
    name: '파일이름을 넣어주세요.',
    content: fs.readFileSync('파일이름을 넣어주세요.', 'utf8'),
};

uploadVideo(username, file);
for (let i = 0; i < 10; i++) {
    console.log('hello');
}
