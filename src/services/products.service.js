import { products } from '../DAO/factory.js';
import CartDTO from '../dto/cartTicket.dto.js';
import { cartsService } from './carts.service.js';

class ProductService {
  async getProducts(page, limit) {
    const prod = await products.getProductsPaginate(page, limit);
    return prod;
  }

  async getProductById(id) {
    const productFound = await products.getProductById(id);
    return productFound;
  }

  async deleteProduct(id) {
    const productDeleted = await products.deleteProduct(id);
    return productDeleted;
  }

  async createProduct(newProduct) {
    const { title, description, price, thubmail, code, stock } = newProduct;
    const productCreated = await products.createProduct(title, description, price, thubmail, code, stock);
    return productCreated;
  }

  async putProduct(id, newProduct) {
    const { title, description, price, thubmail, code, stock } = newProduct;
    const productEdited = await products.editProduct(id, title, description, price, thubmail, code, stock);
    return productEdited;
  }

  async consultStock(cartProductArray, cartId) {
    let newCart = [];
    let noStockAvailable = [];

    for (let i = 0; i < cartProductArray.length; i++) {
      let cartProduct = cartProductArray[i];
      let productId = cartProduct.idProduct._id.toString();
      let product = await this.getProductById(productId);

      console.log(cartProduct.quantity, ' - ', product.stock);

      if (cartProduct.quantity <= product.stock) {
        const cartProductDto = new CartDTO(cartProduct.idProduct, cartProduct.quantity);
        const newStock = product.stock - cartProduct.quantity;
        newCart.push(cartProductDto);
        await products.decreaseProductAmount(productId, newStock);
        console.log('se puede comprar');
      } else {
        noStockAvailable.push(cartProduct);
        console.log('no se puede comprar');
      }
    }

    if (noStockAvailable.length > 0) {
      await cartsService.putCartProductArray(cartId, noStockAvailable);
    } else {
      await cartsService.deleteAllProductsFromCart(cartId);
    }

    return newCart;
  }
}

export const productService = new ProductService();
