import express from 'express';
import { sessionController } from '../controllers/session.controller.js';
import { checkUser } from '../middleware/auth.js';

export const sessionsRouter = express.Router();

sessionsRouter.get('/current', checkUser, sessionController.showSession);
