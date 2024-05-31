import { Router } from 'express';
import {
    createOrg,
    getMyOrgs,
} from '../Controllers/organisationsController.js';
export const organizationRouter = Router();

organizationRouter.post('/create', createOrg);
organizationRouter.get('/get', getMyOrgs);
