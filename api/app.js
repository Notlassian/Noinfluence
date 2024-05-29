import express from 'express';
import cors from 'cors';
import { healthCheckRouter } from './Routes/healthRoute.js';
import { testPermissionRouter } from './Routes/testPermissionsRoute.js';
import { authenticationMiddleware } from './Middleware/authenticationMiddleware.js';

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
app.use(authenticationMiddleware);

app.use('/healthcheck', healthCheckRouter);
app.use('/permisssions', testPermissionRouter);

app.listen(port, (error) => {
  if (!error)
    console.log(
      'Server is Successfully Running, and App is listening on port ' + port,
    );
  else console.log("Error occurred, server can't start", error);
});
