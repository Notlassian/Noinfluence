import { Router } from 'express';
import {
    hasSpacePermission,
    PermissionsTypes,
} from '../Middleware/authorizationMiddleware.js';
import { getHealth } from '../Controllers/healthCheckController.js';

export const pageRouter = Router({ mergeParams: true });

pageRouter.post(
    '/:folder/:page/add',
    hasSpacePermission(PermissionsTypes.Write),
    getHealth
);
pageRouter.get(
    '/:folder/:page/retrieve',
    hasSpacePermission(PermissionsTypes.Read),
    getHealth
);
pageRouter.post(
    '/:folder/:page/update',
    hasSpacePermission(PermissionsTypes.Write),
    getHealth
);
