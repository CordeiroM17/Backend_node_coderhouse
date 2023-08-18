import { createHash } from "../../utils/bcrypt.js";
import { UserModel } from "./models/users.model.js";

export default class Users {
    constructor() {}
    
    createUser = async (firstName, lastName, email, age, password) => {
        return await UserModel.create({ firstName, lastName, email, age, password: createHash(password), rol: 'user' });
    }

    findUser = async (email) => {
        return await UserModel.findOne({ email });
    }
}