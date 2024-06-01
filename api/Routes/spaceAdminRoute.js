import { Router } from 'express';
import { getHealth } from '../Controllers/healthCheckController.js';
import { getSpaceUsers } from '../Controllers/spaceAdminController.js';

export const spaceAdminRouter = Router({ mergeParams: true });

spaceAdminRouter.post('/add', getHealth);
spaceAdminRouter.get('/list', getSpaceUsers);
spaceAdminRouter.post('/update', getHealth);
spaceAdminRouter.get('/check', getHealth);
