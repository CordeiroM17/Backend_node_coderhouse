import mongoose, { Schema, model } from 'mongoose';

const cartsSchema = new Schema({
  productos: {
    type: [
      {
        idProduct: { type: mongoose.Schema.Types.ObjectId, ref: 'products' },
        quantity: { type: Number, min: 1 },
      },
    ],
  },
});

export const CartsModel = model('carts', cartsSchema);