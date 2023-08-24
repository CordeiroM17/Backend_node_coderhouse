import { productService } from './products.service.js';
import { carts } from '../DAO/factory.js';
import { ticketsService } from './tickets.service.js';

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

  async purchase(cartId) {
    const cartFound = await this.getCartById(cartId);
    this.cartExistValidation(cartFound);

    const cartProductArray = cartFound.productos;
    const productsToAddNewArray = await productService.consultStock(cartProductArray, cartId);

    console.log('ya consulte el stock');

    await ticketsService.createTicket(cartId, productsToAddNewArray);
  }

  async putQuantityProduct(cartId, productId, quantityBody) {
    const cartFound = await this.getCartById(cartId);
    this.cartExistValidation(cartFound);

    const productToEdit = await productService.getProductById(productId);
    this.productExistValidation(productToEdit);

    console.log('verifique que el producto y el carrito existen');

    const { quantity } = quantityBody;

    await carts.updateOne(quantity, cartId, productToEdit);
  }

  async putCartProductArray(cartId, productArray) {
    if (!Array.isArray(productArray)) {
      const { productos } = productArray;
      productArray = productos;
    }
    let newProductArray = productArray.map((prod) => {
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
    const cartFound = await this.getCartById(cartId);
    this.cartExistValidation(cartFound);

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

  async foundProductInCart(cartId, productId) {
    return await carts.findProductInCart(cartId, productId);
  }

  async addItemToCart(cartId, productId) {
    const productToAdd = await productService.getProductById(productId);

    this.productExistValidation(productToAdd);

    const productFoundInCart = await this.foundProductInCart(cartId, productId);

    if (productFoundInCart) {
      await carts.incAmountProductToCart(cartId, productToAdd);
    } else {
      await carts.addProductToCart(cartId, productToAdd);
    }
  }
}

export const cartsService = new CartsService();
