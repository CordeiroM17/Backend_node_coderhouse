import { ProductModel } from "./models/product.model.js";

export default class Products {
    constructor() {}

    getProductsPaginate = async (page, limit) => {
        return await ProductModel.paginate({}, { limit: limit || 10, page: page || 1 });
    };

    getProductById = async (id) => {
        return await ProductModel.findById({ _id: id });
    }
    
    deleteProduct = async (id) => {
        return await ProductModel.deleteOne({ _id: id });
    }

    createProduct = async (title, description, price, thubmail, code, stock) => {
        return await ProductModel.create({ title, description, price, thubmail, code, stock });
    }

    editProduct = async (id, title, description, price, thubmail, code, stock) => {
        await ProductModel.findByIdAndUpdate(id, { title, description, price, thubmail, code, stock });
    }
}