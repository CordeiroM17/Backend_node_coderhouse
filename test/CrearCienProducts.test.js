import mongoose, { mongo } from 'mongoose';
import chai from 'chai';
import supertest from 'supertest';
import { faker } from '@faker-js/faker';
import crypto from 'crypto';

const expect = chai.expect;
const requester = supertest('http://localhost:8080');

// Cookie
let cookieName;
let cookieValue;

// Productos e ids

let user = {
  email: 'admin@admin.com',
  password: 'admin',
};

// GRUPO DE TEST. DESCRIPCION GENERAL.
describe('Creando 100 productos', () => {
  before(async () => {
    // Conexión a la base de datos
    await mongoose.connect('mongodb+srv://cordeiromariano17:ktAuPli2vRqq5Xcl@coder-cluster.w5gmkui.mongodb.net/ecommerce?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  describe('Usuario admin loggeado', () => {

    it('En endpoint POST /auth/login debe loggear el user creado', async () => {
        console.log(user)
      const result = await requester.post('/auth/login').send({
        email: user.email,
        password: user.password,
      });

      const cookie = result.headers['set-cookie'][0];
      expect(cookie).to.be.ok;

      cookieName = cookie.split('=')[0];
      cookieValue = cookie.split('=')[1];

      expect(cookieName).to.be.ok.and.eql('connect.sid');
      expect(cookieValue).to.be.ok;
    });
  });

  // ENDPOINT PRODUCTS
  describe('Test de Products', () => {
    let product = {}
    let prodCont = 0;

    beforeEach(() => {
      const code = crypto.randomBytes(32).toString('hex');

      product = {
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        thubmail: faker.image.url(),
        code: code,
        stock: faker.number.int(100),
      };
    });

    for (let index = 0; index <= 100; index++) {
      it(`En endpoint POST /api/products deberia crear un producto (Producto ${index})`, async () => {
        const response = await requester
          .post('/api/products')
          .set('Cookie', [`${cookieName}=${cookieValue}`])
          .send(product);

        const { status } = response;
        expect(status).to.equal(201);
      });
    }
  });

  after(async () => {
    // Cierra la conexión después de las pruebas
    await mongoose.connection.close();
  });
});
