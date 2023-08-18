import { CartsModel } from "./models/carts.model";

export default class CartsDb {
  getCartById = async (id) => {
    const cartFound = await CartsModel.findById(id).populate('productos.idProduct');
    return cartFound;
  };
}
