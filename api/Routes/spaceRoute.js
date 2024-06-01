import { Router } from 'express';
import { spaceAdminRouter } from './spaceAdminRoute.js';
import {
    hasSpacePermission,
    isOrgAdmin
} from '../Middleware/authorizationMiddleware.js';

export const spaceRouter = Router();

spaceRouter.use('/:spaceName/admin', hasSpacePermission("edit users"), spaceAdminRouter);

// spaceRouter.post('/add', isOrgAdmin, postToken);
// spaceRouter.get('/list', checkAuthed);