import { Router } from 'express';
import {
    createOrg,
    getMyOrgs,
} from '../Controllers/organisationsController.js';
import { spaceRouter } from './spaceRoute.js';
import { orgAdminRouter } from './orgAdminRoute.js';
import { isOrgAdmin } from '../Middleware/authorizationMiddleware.js';

export const orgRouter = Router({ mergeParams: true });

orgRouter.use('/:orgName/admin', isOrgAdmin, orgAdminRouter);
orgRouter.use('/:orgName/spaces', spaceRouter);

orgRouter.post('/create', createOrg);
orgRouter.get('/list', getMyOrgs);
