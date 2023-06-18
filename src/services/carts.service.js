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

    async putQuantityProduct(cartId, productId, quantityBody) {
        // Busca y comprueba si exite el carrito
        const cartFound = await this.getCartById(cartId);
        this.cartExistValidation(cartFound);

        // Busca y comptueba si existe el producto
        const productToEdit = await productService.getProductById(productId);
        this.productExistValidation(productToEdit)

        console.log("verifique que el producto y el carrito existen");

        const {quantity} = quantityBody;

        await CartsModel.findOneAndUpdate(
            {_id: cartId, "productos.idProduct": productToEdit._id },
            {
                $set: {"productos.$.quantity": quantity}
            }
        );
    }

    async putCartProductArray(cartId, productArray) {
        let newProductArray = productArray.productos.map((prod) => {
            return {
              idProduct: prod.idProduct,
              quantity: prod.quantity
            };
        });

        const cart = await CartsModel.findByIdAndUpdate({_id: cartId}, {productos: newProductArray})
        return cart
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
        const cartFound = await CartsModel.findById(id)
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
        console.log("product añadido")
    }
}

export const cartsService = new CartsService();