import express from 'express';
import { hasPermission } from '../Middleware/authorizationMiddleware.js';
export const testPermissionRouter = express.Router();
import * as testPermissionController from '../Controllers/testPermissionController.js';

testPermissionRouter.get(
  '/Write',
  hasPermission('Write'),
  testPermissionController.writePermissionTest,
);
testPermissionRouter.get(
  '/Read',
  hasPermission('Read'),
  testPermissionController.readPermissionTest,
);
