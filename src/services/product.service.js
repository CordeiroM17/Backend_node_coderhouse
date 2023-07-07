import { ProductModel } from '../DAO/models/product.model.js';

class ProductService {
  async getProducts(page, limit) {
    const products = await ProductModel.paginate({}, { limit: limit || 10, page: page || 1 });
    return products;
  }

  async getProductById(id) {
    const productFound = await ProductModel.findById({ _id: id });
    return productFound;
  }

  async deleteProduct(id) {
    const productDeleted = await ProductModel.deleteOne({ _id: id });
    return productDeleted;
  }

  async createProduct(newProduct) {
    const { title, description, price, thubmail, code, stock } = newProduct;
    const productCreated = await ProductModel.create({ title, description, price, thubmail, code, stock });
    return productCreated;
  }

  async putProduct(id, newProduct) {
    const { title, description, price, thubmail, code, stock } = newProduct;
    const productEdited = await ProductModel.findByIdAndUpdate(id, { title, description, price, thubmail, code, stock });
    return productEdited;
  }
}

export const productService = new ProductService();
