import { Router } from 'express';
import { spaceAdminRouter } from './spaceAdminRoute';

export const spaceRouter = Router();

spaceRouter.use('/:spaceName/admin', spaceAdminRouter);

// spaceRouter.post('/add', postToken);
// spaceRouter.get('/list', checkAuthed);