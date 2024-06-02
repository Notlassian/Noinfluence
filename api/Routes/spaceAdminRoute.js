import { Router } from 'express';
import { getHealth } from '../Controllers/healthCheckController.js';
import {
    addUserRole,
    checkAdmin,
    getSpaceUsers,
    updateUserRole,
} from '../Controllers/spaceAdminController.js';

export const spaceAdminRouter = Router({ mergeParams: true });

spaceAdminRouter.post('/add', addUserRole);
spaceAdminRouter.get('/list', getSpaceUsers);
spaceAdminRouter.post('/update', updateUserRole);
spaceAdminRouter.get('/check', checkAdmin);
