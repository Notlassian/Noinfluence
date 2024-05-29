import express from 'express';
import cors from 'cors';
import { healthCheckRouter } from './Routes/healthRoute.js';
import { testPermissionRouter } from './Routes/testPermissionsRoute.js';
const PORT = 8080;
export const app = express();

const frontend=process.env.FRONT_END_URL || 'http://localhost:5500';
const corsOptions = {
    'origin': frontend,
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false,
    'optionsSuccessStatus': 204
};

app.use(cors(corsOptions));

app.use('/healthcheck', healthCheckRouter);
app.use('/permisssions', testPermissionRouter);

app.listen(PORT, (error) => {
    if (!error)
      console.log("Server is Successfully Running, and App is listening on port " + PORT)
    else
      console.log("Error occurred, server can't start", error);
  }
  );
  