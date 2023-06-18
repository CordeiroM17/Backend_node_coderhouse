import { Schema, model } from "mongoose";
const cartsSchema = new Schema({
    productos: {
        type: [
          {
            producto: {
              type: Schema.Types.ObjectId,
              ref: 'productos',
            },
            quantity: { type: Number, min: 1 },
            idProduct: { type: String }
          },
        ],
        default: [],
    },
})

/* cartsSchema.pre(['findOne', 'find', 'findById'], function() {
    this.populate('productos.producto')
}); */

export const CartsModel = model('carts', cartsSchema)