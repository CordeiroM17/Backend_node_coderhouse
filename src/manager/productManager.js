import fs from "fs"
const createJsonFile = async () => {
  if (!fs.existsSync("src/DAO/db/products.json")) {
    return await fs.promises.writeFile("src/DAO/db/products.json", "[]");
  }
};

createJsonFile();

class ProductManager {
  constructor() {
    this.path = "src/DAO/db/products.json";
    this.products = [];
    this.id = 0;
  }

  async addProduct(newProduct) {
    
    const productFile = await fs.promises.readFile(this.path, "utf-8");
    const products = JSON.parse(productFile);
    this.products = products;

    const findLastProduct = this.products.slice(-1).pop()
    this.id = findLastProduct.id + 1

    let title = newProduct.title;
    let description = newProduct.description;
    let price = newProduct.price;
    let thubmail = newProduct.thubmail;
    let code = newProduct.code;
    let stock = newProduct.stock;
    
    const codeExist = this.products.find((prod) => prod.code == code);
    if (codeExist) {
      return false
    } else {
      const product = {
        id: this.id,
        title: title,
        description: description,
        price: price,
        thubmail: thubmail,
        code: code,
        stock: stock,
      };
      this.products.push(product);
      const productsString = JSON.stringify(this.products);
      await fs.promises.writeFile(this.path, productsString);
      return true
    }
  }

  async getProducts() {
    const fileProducts = await fs.promises.readFile(this.path, "utf-8");
    const fileProductsParse = JSON.parse(fileProducts);
    return fileProductsParse
  }

  async getProductById(id) {
    const fileProducts = await fs.promises.readFile(this.path, "utf-8");
    const fileProductsParse = JSON.parse(fileProducts);
    const findProd = fileProductsParse.find((prod) => prod.id == id);

    if (findProd) {
      return console.log(findProd);
    } else {
      console.log("The product doesn't exist");
    }
  }

  async updateProduct(id, newProduct) {
    const fileProducts = await fs.promises.readFile(this.path, "utf-8");
    const fileProductsParse = JSON.parse(fileProducts);
    const findProd = fileProductsParse.find((prod) => prod.id == id);
    if (findProd) {
      let title = newProduct.title;
      let description = newProduct.description;
      let price = newProduct.price;
      let thubmail = newProduct.thubmail;
      let code = newProduct.code;
      let stock = newProduct.stock;

      const product = {
        id: id,
        title: title,
        description: description,
        price: price,
        thubmail: thubmail,
        code: code,
        stock: stock,
      };

      this.products.push(product);
      const productsString = JSON.stringify(this.products);
      await fs.promises.writeFile(this.path, productsString);

      return true
    } else {
      return false
    }
  }

  async deleteProduct(id) {
    const fileProducts = await fs.promises.readFile(this.path, "utf-8");
    const fileProductsParse = JSON.parse(fileProducts);

    const positionProduct = fileProductsParse.findIndex(
      (prod) => prod.id == id
    );

    if (positionProduct == -1) {
      console.log("Product not found");
    } else {
      delete fileProductsParse[positionProduct];
      const productsDelete = fileProductsParse.filter(
        (prod) => prod !== undefined
      );

      const productsString = JSON.stringify(productsDelete);
      await fs.promises.writeFile(this.path, productsString);
    }
  }
}

export const productManager = new ProductManager();