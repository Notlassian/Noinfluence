import { Router } from 'express';
import {
    hasSpacePermission,
    permissionsEnum,
} from '../Middleware/authorizationMiddleware.js';
import { getHealth } from '../Controllers/healthCheckController.js';

export const pageRouter = Router({ mergeParams: true });

spaceRouter.post(
    '/add',
    hasSpacePermission(permissionsEnum.WRITE),
    getHealth()
);
spaceRouter.get(
    '/retrieve',
    hasSpacePermission(permissionsEnum.READ),
    getHealth()
);
spaceRouter.post(
    '/update',
    hasSpacePermission(permissionsEnum.WRITE),
    getHealth()
);
