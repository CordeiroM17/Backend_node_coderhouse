import { CartsModel } from "../DAO/models/carts.model.js";
import { productService } from "./product.service.js";

class CartsService {
    productExistValidation(product) {
        if (!product) {
            throw new Error("product not found");
        }
    }

    cartExistValidation(cart) {
        if (!cart) {
            throw new Error("cart not found");
        }
    }

    async deleteAllProductsFromCart(cartId) {
        await CartsModel.findByIdAndUpdate(cartId, {productos: []});
    }

    async deleteProductFromCart(cartId, productId) {

        // Busca y comprueba si exite el carrito
        const cartFound = await this.getCartById(cartId);
        this.cartExistValidation(cartFound);

        // Busca y comptueba si existe el producto
        const productToDelete = await productService.getProductById(productId);
        this.productExistValidation(productToDelete);

        await CartsModel.updateOne({_id: cartId}, {$pull: {productos:{idProduct: productId}}});
    }

    async getCartById(id) {
        console.log("entrando: ",id)
        const cartFound = await CartsModel.findById(id)
        console.log(cartFound)
        return cartFound;
    }

    async addItemToCart(cartId, productId) {
        const productToAdd = await productService.getProductById(productId);

        this.productExistValidation(productToAdd)

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
        console.log("añadido")
    }
}

export const cartsService = new CartsService();