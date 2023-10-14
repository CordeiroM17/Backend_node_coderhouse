import express from 'express';
import handlebars from 'express-handlebars';
import 'express-async-errors';
import { cartsRouter } from './routes/carts.routes.js';
import { productsRouter } from './routes/products.routes.js';
import { viewsRouter } from './routes/views.routes.js';
import { authRouter } from './routes/auth.routes.js';
import { __dirname } from './dirname.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { iniPassport } from './utils/passport.js';
import passport from 'passport';
import { entorno } from './dirname.js';
import { factory } from './DAO/factory.js';
import { errorHandler } from './middleware/error.js';
import compression from 'express-compression';
import { forgotPasswordRouter } from './routes/forgotPassword.routes.js';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';
import { logger } from './utils/logger.js';
import CustomError from './services/errors/customError.js';
import EErrors from './services/errors/enums.js';
import { usersRouter } from './routes/users.routes.js';
import { Server } from 'socket.io';
import { productService } from './services/products.service.js';

const app = express();
factory();

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(cookieParser());
app.use(
  compression({
    brotli: { enable: true, zlib: {} },
  })
);

app.use(
  session({
    secret: 'super secret key',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: entorno.MONGO_URL,
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 100000,
    }),
  })
);

// PASSPORT
iniPassport();
app.use(passport.initialize());
app.use(passport.session());

// SWAGGER
const swaggerOptions = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'Documentacion de CoderBackend',
      description: 'Este es el proyecto que hice para el curso de backend en coderhouse',
    },
  },
  apis: [`${__dirname}/docs/**/*.yaml`],
};

// DOCS
const specs = swaggerJSDoc(swaggerOptions);
app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

// CONFIGURACION DEL MOTOR DE HANDLEBARS
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

// ENDPOINTS
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/users', usersRouter);
app.use('/auth', authRouter);
app.use('/password', forgotPasswordRouter);
app.use('/', viewsRouter);

app.get('*', (req, res, next) => {
  try {
    CustomError.createError({
      name: 'Page not found',
      cause: 'Non existent path',
      message: 'The page may not exist',
      code: EErrors.PAGE_NOT_FOUND,
    });
  } catch (error) {
    next(error);
  }
});

const httpServer = app.listen(entorno.PORT, () => {
  logger.info(`Server running on port ${entorno.API_URL}`);
});

const socketServer = new Server(httpServer);

socketServer.on('connection', (socket) => {
  socket.on('new-product-created', async () => {
    const productList = await productService.getProducts();
    socketServer.emit('products', productList);
  });

  socket.on('delete-product', async (idToDelete) => {
    await productService.deleteProduct(idToDelete);
    socketServer.emit('delete-product-in-table', idToDelete);
  });
});

app.use(errorHandler);
