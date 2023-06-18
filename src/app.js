import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import { productManager } from "./manager/productManager.js";
import { cartsRoute } from "./routes/carts.routes.js";
import { productsRoute } from "./routes/product.routes.js";
import { realTimeProducts } from "./routes/real-time-products.routes.js";
import { __dirname } from "./dirname.js";
import { connectMongo } from "./utils/connections.js"
import { productsViewRouter } from "./routes/productsView.routes.js";
const app = express();
const port = 8080;

connectMongo();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CONFIGURACION DEL MOTORO DE HANDLEBARS
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

//archivos publicos
app.use(express.static(__dirname + "/public"));

app.get("/", async (req, res) => {
  const allProducts = await productManager.getProducts();
  res.render("home", {allProducts})
});

/* ENDPOINTS */
app.use("/api/products", productsRoute);
app.use("/api/carts", cartsRoute);
app.use("/products", productsViewRouter)
/* VISTA SOCKET */
app.use("/realtimeproducts", realTimeProducts)

app.get("*", (req, res) => {
  return res.status(404).json({
    status: "error",
    msg: "Page not found",
    data: {},
  });
});

const httpServer = app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});

const socketServer = new Server(httpServer);

socketServer.on("connection", (socket) => {

  socket.on("new-product-created", async (newProduct) => {
    const productCreated = await productManager.addProduct(newProduct);
    if (productCreated) {
      const productList = await productManager.getProducts();
      socketServer.emit("products", productList);
    } else {
      socketServer.emit("products", productCreated)
    }
  });

  socket.on("delete-product", async (idToDelete) => {
    await productManager.deleteProduct(idToDelete);
    socketServer.emit("delete-product-in-table", idToDelete);
  })
});

