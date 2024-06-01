import { Router } from 'express';
import { getOrgAdmins } from '../Controllers/orgAdminController.js';

export const orgAdminRouter = Router();

orgAdminRouter.post('/add', getOrgAdmins);
// orgAdminRouter.get('/list', checkAuthed);