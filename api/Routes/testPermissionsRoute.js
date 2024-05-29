import express from 'express';
import { hasSpacePermission } from '../Middleware/authorizationMiddleware.js';
export const testPermissionRouter = express.Router();
import * as testPermissionController from "../Controllers/testPermissionController.js";

testPermissionRouter.get('/Write', hasSpacePermission("Write"), testPermissionController.writePermissionTest);
testPermissionRouter.get('/Read', hasSpacePermission("View"), testPermissionController.readPermissionTest);