import express from 'express';
import { hasSpacePermission, isOrgAdmin } from '../Middleware/authorizationMiddleware.js';
export const testPermissionRouter = express.Router();
import * as testPermissionController from '../Controllers/testPermissionController.js';

testPermissionRouter.get(
    '/Write',
    hasSpacePermission('Write'),
    testPermissionController.writePermissionTest
);
testPermissionRouter.get(
    '/Read',
    hasSpacePermission('Read'),
    testPermissionController.readPermissionTest
);
testPermissionRouter.get(
    '/admin',
    isOrgAdmin(),
    testPermissionController.adminPermissionTest
);
