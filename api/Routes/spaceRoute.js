import { Router } from 'express';
import { spaceAdminRouter } from './spaceAdminRoute.js';
import {
    permissionsEnum,
    hasSpacePermission,
    isOrgAdmin,
} from '../Middleware/authorizationMiddleware.js';
import { createSpace } from '../Controllers/spaceController.js';

export const spaceRouter = Router({ mergeParams: true });

spaceRouter.use(
    '/:spaceName/admin',
    hasSpacePermission(permissionsEnum.EDIT_SPACE),
    spaceAdminRouter
);

spaceRouter.post('/add', isOrgAdmin(), createSpace);
// spaceRouter.get('/list', checkAuthed);
