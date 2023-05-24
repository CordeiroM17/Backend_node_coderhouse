import fs from "fs"
const createJsonFile = async () => {
  if (!fs.existsSync("src/db/carts.json")) {
    return await fs.promises.writeFile("src/db/carts.json", "[]");
  }
};

createJsonFile();

import { ProductManager } from "./productManager.js";
const productManager = new ProductManager();

export class CartManager {
    constructor() {
        this.pathCarts = "src/db/carts.json";
        this.pathProduct = "src/db/products.json";
        this.carts = [];
    };

    async getCart(idCart) {
        const fileCarts = await fs.promises.readFile(this.pathCarts, "utf-8");
        const fileCartsParse = JSON.parse(fileCarts);
        const findCart = fileCartsParse.find((cart) => cart.idCarrito == idCart);

        if (findCart) {
            return findCart
        } else {
            return false
        }
    }

    createCart(cartId) {
        const newCart = {
            idCarrito: cartId,
            productos: [],
        }
        this.carts.push(newCart)
        let newCartsString = JSON.stringify(this.carts);
        fs.writeFileSync(this.pathCarts, newCartsString);
    }

    async addItemToCart(cartId, productId) {
        const fileCarts = await fs.promises.readFile(this.pathCarts, "utf-8")
        const fileCartsParse = JSON.parse(fileCarts);
        this.carts = fileCartsParse;
        
        productId = parseInt(productId)
        cartId = parseInt(cartId)

        const allProducts = await productManager.getProducts();
        const productFound = allProducts.find((product) => product.id == productId);
        if (productFound) {
            let findCart = fileCartsParse.find((cart) => cart.idCarrito == cartId);
            
            if (!findCart) {
                this.createCart(cartId);
                findCart = fileCartsParse.find((cart) => cart.idCarrito == cartId);
            }

            const foundProductInCart = findCart.productos.find((product) => product.idProduct === productId);

            if (foundProductInCart) {
                foundProductInCart.quantity++;

                let cartsString = JSON.stringify(this.carts);
                fs.writeFileSync(this.pathCarts, cartsString);
                return true
            } else {
                const products = {
                    idProduct: productId,
                    quantity: 1,
                }
                findCart.productos.push(products)
                let cartsString = JSON.stringify(this.carts);
                fs.writeFileSync(this.pathCarts, cartsString);
                return true
            }
        } else {
            return false
        }
    }
}