import express from "express";
import { cartsService } from "../services/carts.service.js";
export const cartsRoute = express.Router();

cartsRoute.get("/:cid", async (req, res) => {
    try {
        const cartId = req.params.cid;
        const cart = await cartsService.getCartById(cartId)
        return res.status(201).json({
            status: "success",
            msg: `cartId: ${cartId}`,
            data: cart
        })
    } catch (error) {
        return res.status(500).json({ 
            status: "error", 
            msg: "something went wrong",
            data: {}
        });
    }
});

cartsRoute.post("/:cid/product/:pid", async (req, res) => {
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const productAddToCart = await cartsService.addItemToCart(cartId, productId);
        const cart = await cartsService.getCartById(cartId)
        return res.status(201).json({
            status: "success",
            msg: "product added",
            data: cart
        })
    } catch (error) {
        return res.status(404).json({
            status: "error",
            msg: "product not added",
            data: {}
        })
    }
    
    const cart = await cartManager.getCart(cartId);
});