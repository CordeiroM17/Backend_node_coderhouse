import express from 'express';
import { sessionController } from '../controllers/session.controller.js';

export const sessionsRouter = express.Router();

sessionsRouter.get('/current', sessionController.showSession);
