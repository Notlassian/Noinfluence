import { Router } from 'express';
import { spaceAdminRouter } from './spaceAdminRoute.js';
import {
    PermissionsTypes,
    hasSpacePermission,
    isOrgAdmin,
} from '../Middleware/authorizationMiddleware.js';
import {
    createSpace,
    getFoldersWithPages,
    getSpaces,
} from '../Controllers/spaceController.js';
import { getHealth } from '../Controllers/healthCheckController.js';
import { pageRouter } from './pageRoute.js';

export const spaceRouter = Router({ mergeParams: true });

spaceRouter.use(
    '/:spaceName/admin',
    hasSpacePermission(PermissionsTypes.EditSpace),
    spaceAdminRouter
);
spaceRouter.use('/:spaceName/pages', pageRouter);

spaceRouter.post('/add', isOrgAdmin, createSpace);
spaceRouter.get('/list', getSpaces);
spaceRouter.get('/:spaceName/list', getFoldersWithPages);
