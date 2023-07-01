import { UserModel } from "../DAO/models/users.model.js";

class UsersService {
    registerFieldsComprobation(fields) {
        const { firstName, lastName, email, age, password } = fields;
        if (!firstName || !lastName || !email || !age || !password) {
            throw new Error("completa todos los campos");
        }
    }

    loginFieldsComprobation(fields) {
        const { email, password } = fields;
        if (!email || !password) {
            throw new Error("datos incorrectos");
        }
    }

    async registerNewUser(fields) {
        this.registerFieldsComprobation(fields);
        const { firstName, lastName, email, age, password } = fields;
        return await UserModel.create({firstName, lastName, email, age, password, admin: false});
    }

    async loginUser(fields) {
        this.loginFieldsComprobation(fields);
        const { email, password } = fields;
        const foundUser = await UserModel.findOne({ email });
        if (foundUser && foundUser.password === password) {
            return foundUser;
        }
    }
}

export const usersService = new UsersService();