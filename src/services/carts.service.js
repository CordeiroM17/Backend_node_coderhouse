import { productService } from './products.service.js';
import { carts } from '../DAO/factory.js';

class CartsService {
  productExistValidation(product) {
    if (!product) {
      throw new Error('product not found');
    }
  }

  cartExistValidation(cart) {
    if (!cart) {
      throw new Error('cart not found');
    }
  }

  async putQuantityProduct(cartId, productId, quantityBody) {
    // Busca y comprueba si exite el carrito
    const cartFound = await this.getCartById(cartId);
    this.cartExistValidation(cartFound);

    // Busca y comprueba si existe el producto
    const productToEdit = await productService.getProductById(productId);
    this.productExistValidation(productToEdit);

    console.log('verifique que el producto y el carrito existen');

    const { quantity } = quantityBody;

    await carts.updateOne(quantity, cartId, productToEdit);
  }

  async putCartProductArray(cartId, productArray) {
    let newProductArray = productArray.productos.map((prod) => {
      return {
        idProduct: prod.idProduct,
        quantity: prod.quantity,
      };
    });

    const cart = await carts.putArrayInCart(cartId, newProductArray);
    return cart;
  }

  async deleteAllProductsFromCart(cartId) {
    await carts.deleteAllProducts(cartId);
  }

  async deleteProductFromCart(cartId, productId) {
    // Busca y comprueba si exite el carrito
    const cartFound = await this.getCartById(cartId);
    this.cartExistValidation(cartFound);

    // Busca y comprueba si existe el producto
    const productToDelete = await productService.getProductById(productId);
    this.productExistValidation(productToDelete);

    await carts.deleteOneProductFormCart(cartId, productId);
  }

  async createCart() {
    const newCart = await carts.createCart();
    return newCart;
  }

  async getCartById(id) {
    const cartFound = await carts.getCartById(id);
    return cartFound;
  }

  async addItemToCart(cartId, productId) {
    const productToAdd = await productService.getProductById(productId);

    this.productExistValidation(productToAdd);

    const cartFound = carts.incAmountProductToCart(cartId, productToAdd)

    if (!cartFound) {
      carts.addProductToCart(cartId, productToAdd)
    }
    console.log('product añadido');
  }
}

export const cartsService = new CartsService();
