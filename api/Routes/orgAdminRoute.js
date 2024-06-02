import { Router } from 'express';
import { addOrgAdmin, getOrgAdmins } from '../Controllers/orgAdminController.js';
import { getHealth } from '../Controllers/healthCheckController.js';

export const orgAdminRouter = Router({ mergeParams: true });

orgAdminRouter.post('/add', addOrgAdmin);
orgAdminRouter.get('/list', getOrgAdmins);
