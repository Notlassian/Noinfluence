import { Router } from 'express';
import { getHealth } from '../Controllers/healthCheckController.js';
import { postToken } from '../Controllers/tokenController.js';

export const tokenRouter = Router();

tokenRouter.post('/', postToken);
