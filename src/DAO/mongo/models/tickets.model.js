import mongoose, { Schema, model } from 'mongoose';

const schema = new Schema(
  {
    cart: {
      type: [],
    },
    code: { type: mongoose.Types.ObjectId, index: true, required: true, auto: true },
    amount: { type: Number },
    purchaser: { type: String },
  },
  {
    timestamps: true,
  }
);

export const TicketsModel = model('tickets', schema);
