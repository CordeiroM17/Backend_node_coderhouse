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
      res.send('no existe el correo');
    }
  }
}

export const usersService = new UsersService();
