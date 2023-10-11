import express from 'express';
import { checkAdmin, checkUser } from '../middleware/auth.js';
import { usersController } from '../controllers/users.controller.js';
export const usersRouter = express.Router();

usersRouter.get('/current', checkUser, usersController.sessionInformation)

usersRouter.get('/getallusers', checkUser, usersController.getAllUsers)

usersRouter.delete('/clearusers', checkUser, checkAdmin, usersController.cleanUsersAfterTwoDays)

usersRouter.delete('/:uid', checkUser, checkAdmin, usersController.deleteUser)