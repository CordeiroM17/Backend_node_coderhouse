import { Schema, model } from 'mongoose';

const schema = new Schema({
  email: { type: String, required: true, max: 100, unique: true },
  password: { type: String, required: false, max: 100 },
  firstName: { type: String, required: false, max: 100 },
  lastName: { type: String, required: false, max: 100 },
  age: { type: Number, required: false },
  cart: { type: String, required: false },
  rol: { type: String, default: 'user', required: true },
});

export const UserModel = model('users', schema);
