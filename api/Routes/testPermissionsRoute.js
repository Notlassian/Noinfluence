import express from 'express';
import {
    enumPermissions,
    hasSpacePermission,
    isOrgAdmin,
} from '../Middleware/authorizationMiddleware.js';
export const testPermissionRouter = express.Router();
import * as testPermissionController from '../Controllers/testPermissionController.js';
const testRouter = express.Router({ mergeParams: true });

testPermissionRouter.use('/:orgName/:spaceName', testRouter);

testRouter.get(
    '/Write',
    hasSpacePermission(enumPermissions.WRITE),
    testPermissionController.writePermissionTest
);
testRouter.get(
    '/Read',
    hasSpacePermission(enumPermissions.READ),
    testPermissionController.readPermissionTest
);
testRouter.get(
    '/admin',
    isOrgAdmin(),
    testPermissionController.adminPermissionTest
);
