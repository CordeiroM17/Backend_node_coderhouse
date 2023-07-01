import express from "express";
import { usersService } from "../services/users.service.js";
export const loginRouter = express.Router();

loginRouter.post('/register', async (req, res) => {
    const fields = req.body
    try {
        await usersService.registerNewUser(fields);
        req.session.user = fields.email;
        req.session.admin = false;
        return res.redirect("/")
    } catch (error) {
        console.log(error);
        return res.status(400).render("errorPage", {msg: "comprueba el email e intente mas tarde"});
    };
});

loginRouter.post('/login', async (req, res) => {
    const fields = req.body;
    try {
        const user = await usersService.loginUser(fields);
        req.session.firstName = user.firstName;
        req.session.email = user.email;
        req.session.admin = user.admin;
        return res.redirect("/products")
    } catch (error) {
        console.log(error);
        return res.status(400).render("errorPage", {msg: "email o pass incorrectos"});
    }
});