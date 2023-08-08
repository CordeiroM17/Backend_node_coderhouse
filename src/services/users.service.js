import { UserModel } from '../DAO/models/users.model.js';
import { createHash, isValidPassword } from '../utils/bcrypt.js';

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
    const { firstName, lastName, email, age, password } = fields;
    return await UserModel.create({ firstName, lastName, email, age, password: createHash(password), rol: 'user' });
  }

  async loginUser(fields) {
    this.loginFieldsComprobation(fields);
    const { email, password } = fields;
    const foundUser = await UserModel.findOne({ email });
    if (foundUser && isValidPassword(password, foundUser.password)) {
      return foundUser;
    } else {
      return false;
    }
  }
}

export const usersService = new UsersService();
