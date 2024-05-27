import express from 'express';
import cors from 'cors';
import {healthCheckRouter} from './controllers/healthCheckController.js';

export const app = express();

const corsOptions = {
    'origin': '*',
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false,
    'optionsSuccessStatus': 204
};

app.use(cors(corsOptions));

app.use('/health', healthCheckRouter);

app.listen(8080);

