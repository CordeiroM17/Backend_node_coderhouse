import { Schema, model } from 'mongoose';
import { cartsService } from '../../../services/carts.service.js'

const schema = new Schema({
  email: { type: String, required: true, max: 100, unique: true },
  password: { type: String, required: true, max: 100 },
  firstName: { type: String, required: true, max: 100 },
  lastName: { type: String, required: true, max: 100 },
  age: { type: Number },
  cart: { type: String },
  rol: { type: String, default: 'user', required: true },
});

export const UserModel = model('users', schema);