import { Router } from 'express';
import { spaceAdminRouter } from './spaceAdminRoute.js';
import {
    hasSpacePermission,
    isOrgAdmin,
} from '../Middleware/authorizationMiddleware.js';
import { createSpace } from '../Controllers/spaceController.js';

export const spaceRouter = Router({ mergeParams: true });

spaceRouter.use(
    '/:spaceName/admin',
    hasSpacePermission('edit users'),
    spaceAdminRouter
);

spaceRouter.post('/add', isOrgAdmin(), createSpace);
// spaceRouter.get('/list', checkAuthed);
