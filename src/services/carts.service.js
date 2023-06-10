import { CartsModel } from "../DAO/models/carts.model.js";
import { productService } from "./product.service.js";

class CartsService {
    async getCartById (id) {
        const cartFound = await CartsModel.findById({_id: id});
        return cartFound;
    }

    async addItemToCart(cartId, productId) {
        const productToAdd = await productService.getProductById(productId);

        if (!productToAdd) {
            throw new Error("product not found");
        }

        const cartFound = await CartsModel.findOneAndUpdate(
            {_id: cartId, "productos.idProduct": productToAdd._id },
            {
                $inc: {"productos.$.quantity": 1}
            }
        );

        if (!cartFound) {
            await CartsModel.findByIdAndUpdate(cartId, {
              $push: { productos: { idProduct: productToAdd._id, quantity: 1 } },
            });
          }
    }
}

export const cartsService = new CartsService();