import { users } from '../DAO/factory.js';
import getAllUsersDTO from '../dto/getAllUsers.dto.js';

class UsersService {
  async getAllUsers() {
    let newUsersArray = [];
    const allUsers = await users.getAllUsers();
    for (let i = 0; i < allUsers.length; i++) {
      const user = allUsers[i];

      const userDto = new getAllUsersDTO(user);

      newUsersArray.push(userDto);
    }
    return newUsersArray;
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
        await users.deleteOneUser(userId);
        usersDeleted = usersDeleted + 1;
      }
    }
    return usersDeleted;
  }

  async deleteOneUser(userId) {
    await users.deleteOneUser(userId);
  }
}

export const usersService = new UsersService();
