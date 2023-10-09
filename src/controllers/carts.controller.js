import { cartsService } from '../services/carts.service.js';

export const cartsController = {
  purchase: async function (req, res) {
    try {
      const cartId = req.params.cid;
      const ticket = await cartsService.purchase(cartId);
      return res.status(201).json({
        status: 'Success',
        msg: 'This is your ticket',
        data: ticket,
      });
    } catch (error) {
      return res.status(500).json({
        status: 'Error',
        msg: 'Something went wrong',
        data: {},
      });
    }
  },
  showOneCart: async function (req, res) {
    try {
      const cartId = req.params.cid;
      const cart = await cartsService.getCartById(cartId);
      return res.status(201).json({
        status: 'Success',
        msg: `CartId: ${cartId}`,
        data: cart,
      });
    } catch (error) {
      return res.status(404).json({
        status: 'Error',
        msg: 'Cart not found',
        data: {},
      });
    }
  },

  createOneCart: async function (req, res) {
    try {
      const newCart = await cartsService.createCart();
      return res.status(200).send({
        status: 'Success',
        msg: 'Cart created',
        data: newCart,
      });
    } catch (error) {
      return res.status(500).json({
        status: 'Error',
        msg: 'Something went wrong',
        data: {},
      });
    }
  },

  addProductToCart: async function (req, res) {
    try {
      const cartId = req.params.cid;
      const productId = req.params.pid;
      await cartsService.addItemToCart(cartId, productId);
      const cart = await cartsService.getCartById(cartId);
      return res.status(201).json({
        status: 'Success',
        msg: 'Product added',
        data: cart,
      });
    } catch (error) {
      return res.status(404).json({
        status: 'Error',
        msg: 'Product not added',
        data: {},
      });
    }
  },

  removeOneProductFromCart: async function (req, res) {
    try {
      const cartId = req.params.cid;
      const productId = req.params.pid;
      await cartsService.deleteProductFromCart(cartId, productId);
      return res.status(201).json({
        status: 'Success',
        msg: 'Product deleted from this cart',
        data: {},
      });
    } catch (error) {
      return res.status(404).json({
        status: 'Error',
        msg: 'Product not deleted to the cart',
        data: {},
      });
    }
  },

  removeAllProductsFromCart: async function (req, res) {
    try {
      const cartId = req.params.cid;
      await cartsService.deleteAllProductsFromCart(cartId);
      return res.status(201).json({
        status: 'Success',
        msg: 'All products were removed from cart',
        data: {},
      });
    } catch (error) {
      return res.status(500).json({
        status: 'Error',
        msg: 'Something went wrong',
        data: {},
      });
    }
  },

  updateProductQuantity: async function (req, res) {
    try {
      const cartId = req.params.cid;
      const productId = req.params.pid;
      const quantityBody = req.body;
      await cartsService.putQuantityProduct(cartId, productId, quantityBody);
      return res.status(201).json({
        status: 'Success',
        msg: 'Quantity edited',
        data: {},
      });
    } catch (error) {
      return res.status(404).json({
        status: 'Error',
        msg: 'Quantity not edited',
        data: {},
      });
    }
  },

  addArrayProducts: async function (req, res) {
    try {
      const cartId = req.params.cid;
      const productArray = req.body;
      const cart = await cartsService.putCartProductArray(cartId, productArray);
      return res.status(201).json({
        status: 'Success',
        msg: 'Product array added',
        data: cart,
      });
    } catch (error) {
      return res.status(404).json({
        status: 'Error',
        msg: 'Product array not added',
        data: {},
      });
    }
  },
};
