import { CartsModel } from "../DAO/models/carts.model.js";

class CartsService {
    async getCartById (id) {
        const cartFound = await CartsModel.findById({_id: id});
        return cartFound;
    }

    async addItemToCart(cartId, productId) {
        const cartFound = await CartsModel.findById({_id: cartId});
        console.log(cartFound);
        return cartFound;
    }
}

export const cartsService = new CartsService();