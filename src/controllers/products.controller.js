import { productService } from '../services/products.service.js';

export const productsController = {
  getAllProducts: async function (req, res) {
    try {
      const { page, limit } = req.query;
      const products = await productService.getProducts(page, limit);
      let productsMap = products.docs.map((prod) => {
        return {
          id: prod._id,
          title: prod.title,
          description: prod.description,
          thumbnail: prod.thumbnail,
          price: prod.price,
          code: prod.code,
          stock: prod.stock,
        };
      });
      console.log(typeof productsMap);
      return res.status(200).json({
        status: 'Success',
        payload: productsMap,
        totalPages: products.totalPages,
        prevPage: products.prevPage,
        nextPage: products.nextPage,
        page: products.page,
        hasPrevPage: products.hasPrevPage,
        hasNextPage: products.hasNextPage,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: 'error',
        msg: 'something went wrong',
        data: { error },
      });
    }
  },

  showOneProduct: async function (req, res) {
    try {
      let productId = req.params.pid;
      const productFound = await productService.getProductById(productId);
      return res.status(200).json({
        status: 'Success',
        msg: 'Product found',
        data: productFound,
      });
    } catch (error) {
      return res.status(404).json({
        status: 'error',
        msg: 'product not found',
        data: 'product ID not found',
      });
    }
  },

  deleteOneProduct: async function (req, res) {
    try {
      const pid = req.params.pid;
      await productService.deleteProduct(pid);
      return res.status(200).json({
        status: 'success',
        msg: 'product deleted',
        data: {},
      });
    } catch (error) {
      return res.status(404).json({
        status: 'error',
        msg: 'product not exist',
        data: 'product not deleted',
      });
    }
  },

  createOneProduct: async function (req, res) {
    try {
      const productToCreate = req.body;
      const productCreated = await productService.createProduct(productToCreate);
      return res.status(201).json({
        status: 'success',
        msg: 'product create',
        data: productCreated,
      });
    } catch (error) {
      return res.status(404).json({
        status: 'error',
        msg: 'product not created',
        data: {},
      });
    }
  },

  updateOneProduct: async function (req, res) {
    try {
      const pid = req.params.pid;
      const newProduct = req.body;
      await productService.putProduct(pid, newProduct);
      return res.status(201).json({
        status: 'success',
        msg: 'successfully modified product',
        data: newProduct,
      });
    } catch (error) {
      return res.status(404).json({
        status: 'error',
        msg: 'could not modify object',
        data: {},
      });
    }
  },
};
