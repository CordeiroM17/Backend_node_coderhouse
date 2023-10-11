import { users } from '../DAO/factory.js';
import { isValidPassword } from '../utils/bcrypt.js';
import { cartsService } from './carts.service.js';

class AuthService {
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

}

export const authService = new AuthService();
