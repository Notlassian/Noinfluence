import express from 'express';
import { hasPermission } from '../Middleware/authorizationMiddleware.js';
export const testPermissionRouter = express.Router();

testPermissionRouter.get('/Write', hasPermission("Write"), (req, res) => {
    res.status(200);
    res.send('Yeah you can indeed write');
});
 
testPermissionRouter.get('/Read', hasPermission("Read"), (req, res) => {
    res.status(200);
    res.send('Yeah you can indeed Read');
});
 