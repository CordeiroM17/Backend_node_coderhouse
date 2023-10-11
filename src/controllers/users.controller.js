import CurrentDTO from '../dto/current.dto.js';
import { usersService } from '../services/users.service.js';

export const usersController = {
  sessionInformation: async function (req, res) {
    try {
      const currentDto = new CurrentDTO(req.session.user);
      return res.status(200).json({
        status: 'Success',
        msg: 'This is your session',
        data: currentDto,
      });
    } catch (error) {
      return res.status(500).json({
        status: 'Error',
        msg: 'Something went wrong',
        data: { error },
      });
    }
  },

  getAllUsers: async function (req, res) {
    try {
      const allUser = await usersService.getAllUsers();
      return res.status(200).json({
        status: 'success',
        msg: 'All users',
        data: { allUser },
      });
    } catch (error) {
      return res.status(500).json({
        status: 'Error',
        msg: 'Something went wrongd',
        data: { error },
      });
    }
  },

  cleanUsersAfterTwoDays: async function (req, res) {
    try {
      const usersDeleted = await usersService.cleanUsers();
      return res.status(200).json({
        status: 'Success',
        msg: `Se eliminaron ${usersDeleted} usuarios`,
        data: {},
      });
    } catch (error) {
      return res.status(404).json({
        status: 'Error',
        msg: 'No se pudo borrar los usuarios',
        data: { error },
      });
    }
  },

  deleteUser: async function (req, res) {
    const userId = req.params.uid
    try {
      await usersService.deleteOneUser(userId);
      return res.status(204).json({
        status: 'success',
        msg: 'Usuario eliminado',
        data: {},
      })
    } catch (error) {
      return res.status(404).json({
        status: 'Error',
        msg: 'No se pudo borrar el usuario',
        data: { error },
      });
    }
  }
};
