import { Router } from 'express';
import { getHealth } from '../Controllers/healthCheckController.js';
import { authenticationMiddleware } from '../Middleware/authenticationMiddleware.js';
export const healthCheckRouter = Router();

healthCheckRouter.get('/', getHealth);
healthCheckRouter.get('/auth', authenticationMiddleware, getHealth);
