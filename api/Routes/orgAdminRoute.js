import { Router } from 'express';
import {
    addOrgAdmin,
    checkOrgAdmin,
    getOrgAdmins,
} from '../Controllers/orgAdminController.js';

export const orgAdminRouter = Router({ mergeParams: true });

orgAdminRouter.post('/add', addOrgAdmin);
orgAdminRouter.get('/list', getOrgAdmins);
orgAdminRouter.get('/check', checkOrgAdmin);
