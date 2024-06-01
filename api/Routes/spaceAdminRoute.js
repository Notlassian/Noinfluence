import { Router } from 'express';
import { getHealth } from '../Controllers/healthCheckController';

export const spaceAdminRouter = Router({ mergeParams: true });

spaceAdminRouter.post('/add', getHealth());
spaceAdminRouter.get('/list', getHealth());
spaceAdminRouter.post('/update', getHealth());
spaceAdminRouter.get('/check', getHealth());
