//@ts-check
import { Schema, model } from "mongoose";
import monsoosePaginate from 'mongoose-paginate-v2';

const schema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    thubmail: {type: String, required: false},
    code: {type: String, required: true},
    stock: {type: Number, required: true}
})

schema.plugin(monsoosePaginate);
export const ProductModel = model('products', schema);