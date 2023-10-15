import mongoose, { mongo } from 'mongoose';
import chai from 'chai';
import supertest from 'supertest';
import { faker } from '@faker-js/faker';
import fs from 'fs';

const expect = chai.expect;
const requester = supertest('http://localhost:8080');

// Cookie
let cookieName;
let cookieValue;

// Productos e ids
const staticCode = faker.number.hex();

/* const productOne = {
  title: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  price: faker.commerce.price(),
  thubmail: Agregar archivo local ,
  code: faker.number.hex(),
  stock: faker.number.int(100),
};

const productTwo = {
  title: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  price: faker.commerce.price(),
  thubmail: Agregar archivo local ,
  code: staticCode,
  stock: faker.number.int(100),
}; */

const productTwoEdited = {
  title: 'Samsung 11',
  description: 'Esto es un Samsung 11, increible',
  price: 12000,
  thubmail: 'urlexample',
  code: staticCode,
  stock: 10,
};

let productOneId;
let productTwoId;

// Crea un usuario
const mockUser = {
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  email: faker.internet.email(),
  age: faker.number.int(100),
  password: faker.internet.password(),
};

const adminUser = {
  email: 'admin@admin.com',
  password: 'admin',
};

let emailUser;

// Cart
let cartId;

// GRUPO DE TEST. DESCRIPCION GENERAL.
describe('Testing API CoderHouse', () => {
  before(async () => {
    // Conexión a la base de datos
    await mongoose.connect('mongodb+srv://cordeiromariano17:ktAuPli2vRqq5Xcl@coder-cluster.w5gmkui.mongodb.net/ecommerce?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Limpia la colección 'users'
    // await mongoose.connection.collection('users').deleteMany({});

    // Limpia la colección 'products'
    await mongoose.connection.collection('products').deleteMany({});

    // Limpia la colección 'carts'
    await mongoose.connection.collection('carts').deleteMany({});

    // Limpia la colección 'sessions'
    await mongoose.connection.collection('sessions').deleteMany({});

    // Limpia la colección 'recover-codes'
    await mongoose.connection.collection('tickets').deleteMany({});

    // Limpia la colección 'tickets'
    await mongoose.connection.collection('recover-codes').deleteMany({});
  });

  describe('Test de Users', () => {
    it('En endpoint POST /auth/register debe registrar un usuario', async () => {
      const { _body } = await requester.post('/auth/register').send(mockUser);
      expect(_body);
    });

    it('En endpoint POST /auth/login debe loggear el user admin', async () => {
      const result = await requester.post('/auth/login').send(adminUser);

      const cookie = result.headers['set-cookie'][0];
      expect(cookie).to.be.ok;

      cookieName = cookie.split('=')[0];
      cookieValue = cookie.split('=')[1];

      expect(cookieName).to.be.ok.and.eql('connect.sid');
      expect(cookieValue).to.be.ok;
    });

    it('En endpoint GET /auth/current debe devolver el contenido del user admin', async () => {
      const { _body } = await requester.get('/api/users/current').set('Cookie', [`${cookieName}=${cookieValue}`]);
      expect(_body.data.email).to.be.eql(adminUser.email);
    });
  });

  // ENDPOINT PRODUCTS
  describe('Test de Products', () => {
    it('En endpoint POST /api/products deberia crear un producto (Producto 1)', async () => {
      const response = await requester
        .post('/api/products')
        .set('Cookie', [`${cookieName}=${cookieValue}`])
        .send(productOne);

      const { status, _body } = response;
      productOneId = _body.data._id;
      expect(status).to.equal(201);
    });

    it('En endpoint POST /api/products deberia crear un producto (Producto 2)', async () => {
      const response = await requester
        .post('/api/products')
        .set('Cookie', [`${cookieName}=${cookieValue}`])
        .send(productTwo);

      const { status, _body } = response;
      productTwoId = _body.data._id;
      expect(status).to.equal(201);
    });

    it('En endpoint GET /api/products traer todos los productos', async () => {
      const response = await requester.get('/api/products').set('Cookie', [`${cookieName}=${cookieValue}`]);
      const { status, _body } = response;
      expect(status).to.equal(200);
      // Espera que el contenido del payload sea de 2, ya que creamos 2 productos antes
      expect(_body.payload.length).to.equal(2);
    });

    it('En endpoint DELETE /api/products/:pid debe eliminar ese producto. Eliminar producto 1', async () => {
      const response = await requester.delete(`/api/products/${productOneId}`).set('Cookie', [`${cookieName}=${cookieValue}`]);
      const { status } = response;

      expect(status).to.equal(200);
    });

    it('En endpoint GET /api/products/:pid traer el producto ById', async () => {
      const response = await requester.get(`/api/products/${productTwoId}`).set('Cookie', [`${cookieName}=${cookieValue}`]);
      const { status } = response;

      expect(status).to.equal(200);
    });

    it('En endpoint PUT /api/products/:pid debe editar el producto', async () => {
      const response = await requester
        .put(`/api/products/${productTwoId}`)
        .set('Cookie', [`${cookieName}=${cookieValue}`])
        .send(productTwoEdited);

      const { status } = response;
      expect(status).to.equal(201);
    });

    it('Vuelve a crear el primer producto para usarlo en carts (Producto 1)', async () => {
      const response = await requester
        .post('/api/products')
        .set('Cookie', [`${cookieName}=${cookieValue}`])
        .send(productOne);

      const { status, _body } = response;
      productOneId = _body.data._id;
      expect(status).to.equal(201);
    });
  });

  // ENDPOINT CARTS
  describe('Test de Carts', () => {
    before(async () => {
      emailUser = mockUser.email;
      const userCartFound = await mongoose.connection.collection('users').findOne({ email: emailUser });
      cartId = userCartFound.cart;
    });

    it('En endpoint GET /api/carts/:cid debe traer un cart ById', async () => {
      const response = await requester.get(`/api/carts/${cartId}`).set('Cookie', [`${cookieName}=${cookieValue}`]);

      const { status, _body } = response;
      expect(status).to.equal(201);
      expect(_body.data._id).to.be.eql(cartId);
    });

    it('En endpoint POST /api/carts debe crear un cart', async () => {
      const response = await requester.post('/api/carts').set('Cookie', [`${cookieName}=${cookieValue}`]);

      const { status, _body } = response;
      expect(status).to.equal(200);
      expect(_body.data._id);
    });

    it('En endpoint POST /api/carts/:cid/products/:pid debe agregar el "producto 1" al cart', async () => {
      const response = await requester.post(`/api/carts/${cartId}/products/${productOneId}`).set('Cookie', [`${cookieName}=${cookieValue}`]);

      const { status, _body } = response;
      let productsArray = _body.data.productos;

      expect(status).to.equal(201);
      expect(productsArray.length).to.equal(1);
      expect(_body.data._id).to.be.eql(cartId);
    });

    it('En endpoint POST /api/carts/:cid/products/:pid debe agregar el "producto 2" al cart', async () => {
      const response = await requester.post(`/api/carts/${cartId}/products/${productTwoId}`).set('Cookie', [`${cookieName}=${cookieValue}`]);

      const { status, _body } = response;
      let productsArray = _body.data.productos;

      expect(status).to.equal(201);
      expect(productsArray.length).to.equal(2);
      expect(_body.data._id).to.be.eql(cartId);
    });

    it('En endpoint DELETE /api/carts/:cid/products/:pid debe eliminar el producto completo del cart', async () => {
      const response = await requester.delete(`/api/carts/${cartId}/products/${productOneId}`).set('Cookie', [`${cookieName}=${cookieValue}`]);

      const { status } = response;

      expect(status).to.equal(201);
    });

    it('En endpoint PUT /api/carts/:cid/products/:pid debe editar la cantidad deseada de ese producto', async () => {
      const response = await requester
        .put(`/api/carts/${cartId}/products/${productTwoId}`)
        .set('Cookie', [`${cookieName}=${cookieValue}`])
        .send({
          quantity: 20,
        });

      const { status } = response;
      expect(status).to.equal(201);
    });

    it('En endpoint DELETE /api/carts/:cid debe eliminar todos los productos del cart', async () => {
      const response = await requester.delete(`/api/carts/${cartId}`).set('Cookie', [`${cookieName}=${cookieValue}`]);

      const { status } = response;

      expect(status).to.equal(201);
    });

    it('En endpoint PUT /api/carts/:cid debe agregar un array de objetos', async () => {
      const response = await requester
        .put(`/api/carts/${cartId}`)
        .set('Cookie', [`${cookieName}=${cookieValue}`])
        .send({
          productos: [
            {
              idProduct: productOneId,
              quantity: 15,
            },
            {
              idProduct: productTwoId,
              quantity: 5,
            },
          ],
        });

      const { status } = response;
      expect(status).to.equal(201);
    });

    it('En endpoint POST /api/carts/:cid/purchase debe finalizar la compra del carro', async () => {
      const response = await requester.post(`/api/carts/${cartId}/purchase`).set('Cookie', [`${cookieName}=${cookieValue}`]);

      const { status } = response;
      expect(status).to.equal(201);
    });
  });

  after(async () => {
    // Cierra la conexión después de las pruebas
    await mongoose.connection.close();
  });
});
