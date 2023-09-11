import express from 'express';
import { forgotPasswordController } from '../controllers/forgotPassword.controller.js';

export const forgotPasswordRouter = express.Router();

forgotPasswordRouter.get('/forgotPassword', forgotPasswordController.forgotPasswordGet);
forgotPasswordRouter.post('/forgotPassword', forgotPasswordController.forgotPasswordPost);

forgotPasswordRouter.get('/recover-pass', forgotPasswordController.recoverPasswordGet);
forgotPasswordRouter.post('/recover-pass', forgotPasswordController.recoverPasswordPost);
