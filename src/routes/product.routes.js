import express from 'express';
import { productService } from '../services/product.service.js';
export const productsRouter = express.Router();

productsRouter.get('/', async (req, res) => {
  try {
    const { page, limit } = req.query;
    const products = await productService.getProducts(page, limit);
    let productsMap = products.docs.map((prod) => {
      return {
        id: prod._id,
        title: prod.title,
        description: prod.description,
        thumbnail: prod.thumbnail,
        code: prod.code,
        stock: prod.stock,
      };
    });
    return res.status(200).json({
      status: 'success',
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
      data: {},
    });
  }
});

productsRouter.get('/:pid', async (req, res) => {
  try {
    let productId = req.params.pid;
    const productFound = await productService.getProductById(productId);
    return res.status(200).json({
      status: 'success',
      msg: 'product found',
      data: productFound,
    });
  } catch (error) {
    return res.status(404).json({
      status: 'error',
      msg: 'product not found',
      data: 'product ID not found',
    });
  }
});

productsRouter.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await productService.deleteProduct(id);
    return res.status(200).json({
      status: 'success',
      msg: 'product deleted',
      data: {},
    });
  } catch (error) {
    return res.status(404).json({
      status: 'error',
      msg: 'product not exist',
      data: {},
    });
  }
});

productsRouter.post('/', async (req, res) => {
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
});

productsRouter.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const newProduct = req.body;
    await productService.putProduct(id, newProduct);
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
});
