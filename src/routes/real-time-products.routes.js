import express from "express";
import { productManager } from "../manager/productManager.js";

export const realTimeProducts = express.Router()

realTimeProducts.get("/", async (req, res) => {
    const allProducts = await productManager.getProducts();
    return res.render("realTimeProducts", {allProducts});
});