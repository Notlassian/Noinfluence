import { Router } from 'express';
import {
    hasSpacePermission,
    PermissionsTypes,
} from '../Middleware/authorizationMiddleware.js';
import { getHealth } from '../Controllers/healthCheckController.js';
import { getPage, updatePage } from '../Controllers/pageController.js';

export const pageRouter = Router({ mergeParams: true });

pageRouter.post(
    '/:folderName/:pageName/add',
    hasSpacePermission(PermissionsTypes.Write),
    getHealth
);
pageRouter.get(
    '/:folderName/:pageName/retrieve',
    hasSpacePermission(PermissionsTypes.Read),
    getPage
);
pageRouter.post(
    '/:folderName/:pageName/update',
    hasSpacePermission(PermissionsTypes.Write),
    updatePage
);
