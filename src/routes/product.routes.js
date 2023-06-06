import express from "express";
import { productService } from "../services/product.service.js";
export const productsRoute = express.Router();

productsRoute.get("/", async (req, res) => {
    try {
        const allProducts = await productService.getAllProducts();
        let limit = req.query.limit;
        if (!limit) {
            return res.status(200).json({ 
                status: "success", 
                msg: "all products",
                data: allProducts
            });
        } else if (limit > 0 && limit <= allProducts.length) {
            let productsLimit = allProducts.slice(0, limit);
            return res.status(200).json({
                status: "success",
                msg: `first ${limit} products`,
                data: productsLimit
            });
        } else if (limit > allProducts.length) {
            return res.status(404).json({
            status: "error",
            msg: "exceed the limit of products",
            data: {}
            });
        };
    } catch (error) {
        console.log(error)
        return res.status(500).json({ 
            status: "error", 
            msg: "something went wrong",
            data: {}
        });
    };
});
  
productsRoute.get("/:pid", async (req, res) => {
    try {
        let productId = req.params.pid;
        const productFound = await productService.getProductById(productId);
        return res.status(200).json({ 
            status: "success", 
            msg: "product found",
            data: productFound 
        });
    } catch (error) {
        return res.status(404).json({ 
            status: "error",
            msg: "product not found",
            data: "product ID not found"
        });   
    };
});

productsRoute.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        await productService.deleteProduct(id);
        return res.status(200).json({
            status: "success",
            msg: "product deleted",
            data: {}
        });
    } catch (error) {
        return res.status(404).json({
            status: "error",
            msg: "product not exist",
            data: {}
        });
    };
});

productsRoute.post("/", async (req, res) => {
    try {
        const productToCreate = req.body;
        const productCreated = await productService.createProduct(productToCreate);
        return res.status(201).json({
            status: "success",
            msg: "product create",
            data: productCreated
          });
    } catch (error) {
        return res.status(404).json({
            status: "error",
            msg: "product not created",
            data: {}
        });
    };
});

productsRoute.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const newProduct = req.body;
        await productService.putProduct(id, newProduct)
        return res.status(201).json({
            status: "success",
            msg: "successfully modified product",
            data: newProduct
        });
    } catch (error) {
        return res.status(404).json({
            status: "error",
            msg: "could not modify object",
            data: {}
        });
    };
});