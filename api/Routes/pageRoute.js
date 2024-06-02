import { Router } from 'express';
import {
    hasSpacePermission,
    PermissionsTypes,
} from '../Middleware/authorizationMiddleware.js';
import {
    createPage,
    getPage,
    updatePage,
} from '../Controllers/pageController.js';

export const pageRouter = Router({ mergeParams: true });

pageRouter.post(
    '/:folderName/:pageName/add',
    hasSpacePermission(PermissionsTypes.Write),
    createPage
);

pageRouter.get(
    '/:folderName/:pageName/retrieve',
    hasSpacePermission(PermissionsTypes.Read),
    getPage
);

pageRouter.put(
    '/:folderName/:pageName/update',
    hasSpacePermission(PermissionsTypes.Write),
    updatePage
);
