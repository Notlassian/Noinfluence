import { Router } from 'express';
import { getOrgAdmins } from '../Controllers/orgAdminController.js';
import { getHealth } from '../Controllers/healthCheckController.js';

export const orgAdminRouter = Router({ mergeParams: true });

orgAdminRouter.post('/add', getOrgAdmins);
orgAdminRouter.get('/list', getHealth);
