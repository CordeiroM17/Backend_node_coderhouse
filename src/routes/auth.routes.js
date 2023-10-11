import express from 'express';
import passport from 'passport';
import { authController } from '../controllers/auth.controller.js';
import { checkUser } from '../middleware/auth.js';

export const authRouter = express.Router();

authRouter.get('/register', authController.registerGet);
authRouter.post('/register', passport.authenticate('register', { failureRedirect: '/auth/failregister' }), authController.registerPost);

authRouter.get('/login', authController.loginGet);
authRouter.post('/login', passport.authenticate('login', { failureRedirect: '/auth/faillogin' }), authController.loginPost);

authRouter.get('/logout', checkUser, authController.logout);

authRouter.get('/failregister', authController.failRegister);

authRouter.get('/faillogin', authController.failLogin);

authRouter.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

authRouter.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/' }), authController.githubLogin);
