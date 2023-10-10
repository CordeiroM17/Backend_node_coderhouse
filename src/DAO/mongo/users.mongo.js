import { createHash } from '../../utils/bcrypt.js';
import { UserModel } from './models/users.model.js';

export default class Users {
  constructor() {}

  getAllUsers = async () => {
    return await UserModel.find();
  };

  createUser = async (firstName, lastName, email, age, password, cartId) => {
    return await UserModel.create({ firstName, lastName, email, age, password: createHash(password), rol: 'user', cart: cartId });
  };

  findUserByEmail = async (email) => {
    return await UserModel.findOne({ email });
  };

  findUserByCart = async (cartId) => {
    return await UserModel.findOne({ cart: cartId });
  };

  changePassword = async (id, pass) => {
    await UserModel.findByIdAndUpdate({ _id: id }, { password: createHash(pass) });
  };

  findUserById = async (id) => {
    return await UserModel.findById(id);
  };

  updateLastLoggedIn = async (id, date) => {
    await UserModel.findByIdAndUpdate({ _id: id }, { lastLoggedIn: date });
  };

  deleteUserAfterTwoDays = async (id) => {
    await UserModel.findByIdAndRemove(id);
  };
}
