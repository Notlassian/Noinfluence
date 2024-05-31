import { Router } from 'express';
import {
    createOrg,
    getMyOrgs,
} from '../Controllers/organisationsController.js';
import { spaceRouter } from './spaceRoute.js';
import { orgAdminRouter } from './orgAdminRoute.js';
export const orgRouter = Router();

orgRouter.use('/:orgName/admin', orgAdminRouter);
orgRouter.use('/:orgName/spaces', spaceRouter);

orgRouter.post('/create', createOrg);
orgRouter.get('/list', getMyOrgs);
