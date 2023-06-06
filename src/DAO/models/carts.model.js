import { Schema, model } from "mongoose";

export const ProductModel = model(
    "carts",
    new Schema({
        productos: {type: Array}
    })
);