import { Router } from 'express';
import {
    hasSpacePermission,
    permissionsEnum,
} from '../Middleware/authorizationMiddleware.js';
import { getHealth } from '../Controllers/healthCheckController.js';

export const pageRouter = Router({ mergeParams: true });

pageRouter.post(
    '/:folder/:page/add',
    hasSpacePermission(permissionsEnum.WRITE),
    getHealth
);
pageRouter.get(
    '/:folder/:page/retrieve',
    hasSpacePermission(permissionsEnum.READ),
    getHealth
);
pageRouter.post(
    '/:folder/:page/update',
    hasSpacePermission(permissionsEnum.WRITE),
    getHealth
);
