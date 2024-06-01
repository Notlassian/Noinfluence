import { Router } from 'express';
import { spaceAdminRouter } from './spaceAdminRoute.js';
import {
    enumPermissions,
    hasSpacePermission,
    isOrgAdmin,
} from '../Middleware/authorizationMiddleware.js';
import { createSpace } from '../Controllers/spaceController.js';

export const spaceRouter = Router({ mergeParams: true });

spaceRouter.use(
    '/:spaceName/admin',
    hasSpacePermission(enumPermissions.ADMIN),
    spaceAdminRouter
);

spaceRouter.post('/add', isOrgAdmin(), createSpace);
// spaceRouter.get('/list', checkAuthed);
