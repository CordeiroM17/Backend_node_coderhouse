import express from 'express';
import handlebars from 'express-handlebars';
import { cartsRouter } from './routes/carts.routes.js';
import { productsRouter } from './routes/products.routes.js';
import { __dirname } from './dirname.js';
import { viewsRouter } from './routes/views.routes.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { iniPassport } from './utils/passport.js';
import passport from 'passport';
import { userRouter } from './routes/users.routes.js';
import { sessionsRouter } from './routes/sessions.routes.js';
import { entorno } from './dirname.js';
import { factory } from './DAO/factory.js';

const app = express();

console.log(entorno);

factory();

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(cookieParser());

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

iniPassport();
app.use(passport.initialize());
app.use(passport.session());

// CONFIGURACION DEL MOTOR DE HANDLEBARS
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

// ENDPOINTS
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/auth', userRouter);
app.use('/', viewsRouter);

app.get('*', (req, res) => {
  return res.status(404).json({
    status: 'error',
    msg: 'Page not found',
    data: {},
  });
});

app.listen(entorno.PORT, () => {
  console.log(`Server running on port http://localhost:${entorno.PORT}`);
});
