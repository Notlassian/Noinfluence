import { Router } from 'express';
import {
    hasSpacePermission
} from '../Middleware/authorizationMiddleware.js';

export const pageRouter = Router();

// spaceRouter.post('/add', hasSpacePermission('write'), postToken);
// spaceRouter.get('/retrieve', hasSpacePermission('read'), checkAuthed);
// spaceRouter.post('/update', hasSpacePermission('write'), postToken);