import dotenv from 'dotenv';

dotenv.config();

export default {
    host: process.env.HOST,
    port: process.env.PORT,
    node_env: process.env.NODE_ENV,
    version: process.env.VERSION,
    client: {
        host: process.env.CLIENT_HOST,
        port: process.env.CLIENT_PORT,
    },
    ssl: {
        privateKey: process.env.SSL_PRIVATE_KEY,
        certificate: process.env.SSL_CERTIFICATE,
    },
    db: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        session: process.env.DB_SESSION_DATABASE,
        dialect: process.env.DB_DIALECT,
    },
    aws: {
        access_key_id: process.env.AWS_ACCESS_KEY_ID,
        secret_access_key: process.env.AWS_SECRET_ACCESS_KEY,
        bucket_name: process.env.AWS_BUCKET_NAME,
        log_bucket_name: process.env.AWS_LOG_BUCKET_NAME,
        region: process.env.AWS_REGION,
    },
    google: {
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret_key: process.env.GOOGLE_CLIENT_SECRET_KEY,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI,
    },
};
