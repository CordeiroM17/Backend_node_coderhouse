import express from "express";
import { productService } from "../services/product.service.js";

export const productsViewRouter = express.Router();

productsViewRouter.get("/", async (req, res) => {
    const { page, limit } = req.query;
    let products = await productService.getProducts(page, limit);
    const productsMap = products.docs.map((prod) => {
        return {
            id: prod._id.toString(),
            title: prod.title,
            description: prod.description,
            price: prod.price,
            thumbnail: prod.thumbnail,
            code: prod.code,
            stock: prod.stock
        };
    });
    return res.status(200).render("products", {
        status: "success", 
        payload: productsMap,
        totalPages: products.totalPages,
        prevPage: products.prevPage,
        nextPage: products.nextPage,
        page: products.page,
        hasPrevPage: products.hasPrevPage,
        hasNextPage: products.hasNextPage, 
    });
});