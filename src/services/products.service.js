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
    if (productFound) {
      return productFound;
    } else {
      throw new Error('Product not exist');
    }
  }

  async deleteProduct(id) {
    const productDeleted = await products.deleteProduct(id);
    if (productDeleted) {
      return productDeleted;
    } else {
      throw new Error('Product not exist');
    }
  }

  async createProduct(newProduct) {
    const { title, description, price, thubmail, code, stock } = newProduct;

    const foundCode = await products.getProductByCode(code);

    if (foundCode) {
      if (foundCode.code == code) {
        throw new Error('Code is already in use');
      }
    } else {
      console.log('codigo usable');
      const productCreated = await products.createProduct(title, description, price, thubmail, code, stock);
      return productCreated;
    }
  }

  async putProduct(id, newProduct) {
    const productFound = await products.getProductById(id);
    if (productFound) {
      const { title, description, price, thubmail, code, stock } = newProduct;
      if (!title || !description || !price || !thubmail || !code || !stock) {
        throw new Error('Faltan campos por enviar');
      } else {
        const productEdited = await products.editProduct(id, title, description, price, thubmail, code, stock);
        return productEdited;
      }
    } else {
      throw new Error('product not exist');
    }
  }

  async consultStock(cartProductArray, cartId) {
    let newCart = [];
    let noStockAvailable = [];

    for (let i = 0; i < cartProductArray.length; i++) {
      let cartProduct = cartProductArray[i];
      let productId = cartProduct.idProduct._id.toString();
      let product = await this.getProductById(productId);

      if (cartProduct.quantity <= product.stock) {
        const cartProductDto = new CartDTO(cartProduct.idProduct, cartProduct.quantity);
        const newStock = product.stock - cartProduct.quantity;
        newCart.push(cartProductDto);
        await products.decreaseProductAmount(productId, newStock);
      } else {
        noStockAvailable.push(cartProduct);
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
