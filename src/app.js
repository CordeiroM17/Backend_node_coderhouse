import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import { productManager } from "./manager/productManager.js";
import { cartsRouter } from "./routes/carts.routes.js";
import { productsRouter } from "./routes/product.routes.js";
import { realTimeProducts } from "./routes/real-time-products.routes.js";
import { __dirname } from "./dirname.js";
import { connectMongo } from "./utils/connections.js"
import { viewsRouter } from "./routes/views.routes.js";
import { loginRouter } from "./routes/login.routes.js";
import cookieParser from 'cookie-parser';
import session from "express-session";
import MongoStore from "connect-mongo";
const app = express();
const port = 8080;

connectMongo();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  session({
    store: MongoStore.create({ mongoUrl: 'mongodb+srv://cordeiromariano17:ktAuPli2vRqq5Xcl@coder-cluster.w5gmkui.mongodb.net/ecommerce?retryWrites=true&w=majority', ttl: 86400 * 7 }),
    secret: 'super secret key',
    resave: true,
    saveUninitialized: true,
  })
);

// CONFIGURACION DEL MOTORO DE HANDLEBARS
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

//archivos publicos
app.use(express.static(__dirname + "/public"));

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/session", loginRouter);

app.use("/realtimeproducts", realTimeProducts)
app.use("/", viewsRouter);

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

