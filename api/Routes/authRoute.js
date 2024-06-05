import { Router } from 'express';
import { checkAuthed, retrieveToken } from '../Controllers/authController.js';
import { authenticationMiddleware } from '../Middleware/authenticationMiddleware.js';

export const authRouter = Router();

authRouter.post('/token', retrieveToken('authorization_code'));
authRouter.get('/check', authenticationMiddleware, checkAuthed);
authRouter.post('/refresh', retrieveToken('refresh_token'));
