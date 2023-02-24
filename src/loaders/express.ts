import express from 'express';
import cors from 'cors';
import ApiDocs from '../docs/index';

function getSwaggerOption() {
    const apiDocs = new ApiDocs();
    apiDocs.init();

    return apiDocs.getSwaggerOption();
}

const { swaggerUI, specs, setUpoption } = getSwaggerOption();

export default (app) => {
    app.get('/status', (req, res) => {
        res.status(200).end();
    });
    app.head('/status', (req, res) => {
        res.status(200).end();
    });

    // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
    // It shows the real origin IP in the heroku or Cloudwatch logs
    app.enable('trust proxy');

    app.use(
        cors({
            origin: true,
            credentials: true,
        }),
    );

    // Transforms the raw string of req.body into json
    app.use(express.json());

    app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs, setUpoption));
    /// catch 404 and forward to error handler
    app.use((req, res, next) => {
        const err = new Error('Not Found');
        err['status'] = 404;
        next(err);
    });

    /// error handlers
    app.use((err, req, res, next) => {
        /**
         * Handle 401 thrown by express-jwt library
         */
        if (err.name === 'UnauthorizedError') {
            return res.status(err.status).send({ message: err.message }).end();
        }
        return next(err);
    });
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.json({
            errors: {
                message: err.message,
            },
        });
    });
};
