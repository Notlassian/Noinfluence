import { Router } from 'express';
import { spaceAdminRouter } from './spaceAdminRoute.js';
import {
    permissionsEnum,
    hasSpacePermission,
    isOrgAdmin,
} from '../Middleware/authorizationMiddleware.js';
import { createSpace } from '../Controllers/spaceController.js';
import { getHealth } from '../Controllers/healthCheckController.js';
import { pageRouter } from './pageRoute.js';

export const spaceRouter = Router({ mergeParams: true });

spaceRouter.use(
    '/:spaceName/admin',
    hasSpacePermission(permissionsEnum.EDIT_SPACE),
    spaceAdminRouter
);
spaceRouter.use('/:spaceName/pages', pageRouter);

spaceRouter.post('/add', isOrgAdmin, createSpace);
spaceRouter.get('/list', getHealth);
spaceRouter.get('/:spaceName/list', )