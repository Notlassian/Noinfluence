import { Router } from 'express';
import { createOrg } from '../Controllers/organisationsController.js';
export const organizationRouter = Router();

organizationRouter.get('/create', createOrg);
