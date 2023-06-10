import { Schema, model } from "mongoose";

export const CartsModel = model(
    "carts",
    new Schema({
        productos: [{type: Object}]
    })
);