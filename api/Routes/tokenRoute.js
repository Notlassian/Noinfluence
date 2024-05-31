import { Router } from 'express';
import { checkAuthed, postToken } from '../Controllers/tokenController.js';

export const tokenRouter = Router();

tokenRouter.post('/', postToken);
tokenRouter.get('/auth', checkAuthed);
