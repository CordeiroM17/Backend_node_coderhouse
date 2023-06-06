import { Schema, model } from "mongoose";

export const ProductModel = model(
    "products",
    new Schema({
        title: {type: String, required: true},
        description: {type: String, required: true},
        price: {type: Number, required: true},
        thubmail: {type: String, required: false},
        code: {type: String, required: true},
        stock: {type: Number, required: true}
    })
);