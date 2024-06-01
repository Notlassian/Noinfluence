import { Router } from 'express';
import { getHealth } from '../Controllers/healthCheckController.js';

export const healthCheckRouter = Router();

healthCheckRouter.get('/', getHealth());
