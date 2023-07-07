import { Schema, model } from 'mongoose';

const schema = new Schema({
  firstName: {
    type: String,
    max: 100,
  },
  lastName: {
    type: String,
    max: 100,
  },
  email: {
    type: String,
    required: true,
    max: 100,
    unique: true,
  },
  age: {
    type: Number,
  },
  password: {
    type: String,
    max: 100,
  },
  admin: {
    type: Boolean,
  },
});

export const UserModel = model('users', schema);
