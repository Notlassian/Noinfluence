import { Router } from 'express';
import { getHealth } from '../Controllers/healthCheckController.js';
import { postToken } from '../controllers/tokenController.js';

export const tokenRouter = Router();

tokenRouter.post('/', postToken);
