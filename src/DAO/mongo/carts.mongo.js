import { CartsModel } from './models/carts.model.js';

export default class Carts {
  constructor() {}

  createCart = async () => {
    return await CartsModel.create({ products: [] });
  };

  getCartById = async (id) => {
    await CartsModel.findById(id).populate('productos.idProduct');
  };

  updateQuantity = async (quantity, cartId, productToEdit) => {
    await CartsModel.findOneAndUpdate(
      { _id: cartId, 'productos.idProduct': productToEdit._id },
      {
        $set: { 'productos.$.quantity': quantity },
      }
    );
  };

  putArrayInCart = async (cartId, newProductArray) => {
    await CartsModel.findByIdAndUpdate({ _id: cartId }, { productos: newProductArray });
  };

  incAmountProductToCart = async (cartId, productToAdd) => {
    await CartsModel.findOneAndUpdate(
      { _id: cartId, 'productos.idProduct': productToAdd._id },
      {
        $inc: { 'productos.$.quantity': 1 },
      }
    );
  };

  addProductToCart = async (cartId, productToAdd) => {
    await CartsModel.findByIdAndUpdate(cartId, {
      $push: { productos: { idProduct: productToAdd._id, quantity: 1 } },
    });
  };

  deleteAllProducts = async (cartId) => {
    await CartsModel.findByIdAndUpdate({ _id: cartId }, { productos: [] });
  };

  deleteOneProductFormCart = async (cartId, productId) => {
    await CartsModel.updateOne({ _id: cartId }, { $pull: { productos: { idProduct: productId } } });
  };
}
