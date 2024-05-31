import { Router } from 'express';
import { checkAuthed, postToken } from '../Controllers/tokenController.js';

export const authRouter = Router();

authRouter.post('/token', postToken);
authRouter.get('/check', checkAuthed);