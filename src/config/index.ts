import dotenv from 'dotenv';

dotenv.config();

export default {
    host: process.env.HOST,
    port: process.env.PORT,
    db: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DATABASE,
    },
    aws: {
        access_key_id: process.env.AWS_ACCESS_KEY,
        secret_access_key: process.env.AWS_SECRET_ACCESS,
        bucket_name: process.env.AWS_BUCKET_NAME,
    },
};
