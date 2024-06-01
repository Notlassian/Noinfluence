import express from 'express';
import cors from 'cors';
import { rateLimit } from 'express-rate-limit';
import { authenticationMiddleware } from './Middleware/authenticationMiddleware.js';
import { orgRouter } from './Routes/orgRoute.js';
import { healthCheckRouter } from './Routes/healthRoute.js';
import { authRouter } from './Routes/authRoute.js';

const port = process.env.PORT || 8080;

export const app = express();

const frontendUrl = process.env.FRONT_END_URL || 'http://localhost:5500';
const corsOptions = {
    origin: frontendUrl,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(limiter);
app.use(express.json());
// app.use(authenticationMiddleware);

app.use('/', healthCheckRouter);
app.use('/auth', authRouter);
app.use('/org', authenticationMiddleware, orgRouter);

app.listen(port, (error) => {
    if (!error)
        console.log(
            'Server is Successfully Running, and App is listening on port ' +
                port
        );
    else console.log("Error occurred, server can't start", error);
});
