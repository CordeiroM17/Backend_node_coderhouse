import { products } from '../DAO/factory.js';

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
    const productEdited = await products.editProduct(id, title, description, price, thubmail, code, stock)
    return productEdited;
  }

}

export const productService = new ProductService();
