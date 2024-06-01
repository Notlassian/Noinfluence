import { Router } from 'express';
import { checkAuthed, postToken } from '../Controllers/tokenController.js';
import { authenticationMiddleware } from '../Middleware/authenticationMiddleware.js';

export const authRouter = Router();

authRouter.post('/token', postToken);
authRouter.get('/check', authenticationMiddleware, checkAuthed);
