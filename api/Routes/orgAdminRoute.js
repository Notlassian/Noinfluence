import { Router } from 'express';
import { getOrgAdmins } from '../Controllers/orgAdminController.js';

export const orgAdminRouter = Router({ mergeParams: true });

orgAdminRouter.post('/add', getOrgAdmins);
// orgAdminRouter.get('/list', checkAuthed);
