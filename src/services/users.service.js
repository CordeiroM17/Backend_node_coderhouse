import { users } from '../DAO/factory.js';
import { isValidPassword } from '../utils/bcrypt.js';
import { cartsService } from './carts.service.js';

class UsersService {
  registerFieldsComprobation(fields) {
    const { firstName, lastName, email, age, password } = fields;
    if (!firstName || !lastName || !email || !age || !password) {
      throw new Error('completa todos los campos');
    }
  }

  loginFieldsComprobation(fields) {
    const { email, password } = fields;
    if (!email || !password) {
      throw new Error('datos incorrectos');
    }
  }

  async findUserById(id) {
    const userFound = await users.findUserById(id);
    return userFound;
  }

  async findUserByEmail(email) {
    const userFound = await users.findUserByEmail(email);
    return userFound;
  }

  async registerNewUser(fields) {
    this.registerFieldsComprobation(fields);
    const { _id } = await cartsService.createCart();
    const cartId = _id.toString();
    const { firstName, lastName, email, age, password } = fields;
    return await users.createUser(firstName, lastName, email, age, password, cartId);
  }

  async loginUser(fields) {
    this.loginFieldsComprobation(fields);
    const { email, password } = fields;
    const foundUser = await users.findUserByEmail(email);
    if (foundUser && isValidPassword(password, foundUser.password)) {
      return foundUser;
    } else {
      return false;
    }
  }

  async changePassword(email, password) {
    const user = await users.findUserByEmail(email);
    const id = user._id.toString();

    if (user) {
      await users.changePassword(id, password);
    } else {
      res.send('No existe el correo');
    }
  }

  async lastLoggedIn(user) {
    const lastLogginDate = new Date();
    const idUser = user._id.toString();
    await users.updateLastLoggedIn(idUser, lastLogginDate);
  }

  areTwoDaysHavePassed(date) {
    const twoDaysAfter = 2 * 24 * 60 * 60 * 1000;
    const actualDate = new Date();

    return date - actualDate > twoDaysAfter;
  }

  async cleanUsers() {
    const allUser = await users.getAllUsers();
    let usersDeleted = 0;
    for (let i = 0; i < allUser.length; i++) {
      let user = allUser[i];

      let userId = user._id;
      let userLastConnectionDate = user.lastLoggedIn;

      if (this.areTwoDaysHavePassed(userLastConnectionDate)) {
        await users.deleteUserAfterTwoDays(userId);
        usersDeleted = usersDeleted + 1;
      }
    }
    return usersDeleted;
  }
}

export const usersService = new UsersService();
