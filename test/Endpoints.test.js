import mongoose from 'mongoose';
import chai from 'chai';
import supertest from 'supertest';
import { faker } from '@faker-js/faker';

// CHAI
const expect = chai.expect;

// SUPERTEST
const requester = supertest('http://localhost:8080');

// CONEXION A MONGO MANUAL
await mongoose.connect('mongodb+srv://cordeiromariano17:ktAuPli2vRqq5Xcl@coder-cluster.w5gmkui.mongodb.net/ecommerce?retryWrites=true&w=majority');

// GRUPO DE TEST. DESCRIPCION GENERAL.
describe('Testing API CoderHouse', () => {
  // ENDPOINT PRODUCTS
  describe('Test de Products', () => {
    /* before(() => {
      mongoose.connection.collections.users.drop();
    }); */

    it('En endpoint GET /api/products traer todos los productos', async () => {
      const response = await requester.get('/api/products');
      const { status, ok, _body } = response;
      expect(status).to.equal(200);
    });

    it('En endpoint GET /api/products/:pid traer el producto ById', async () => {});
  });

  // ENDPOINT CARTS
  describe('Test de Carts', () => {});

  // ENDPOINT USERS
  describe('Test de Users', () => {
    let cookieName;
    let cookieValue;

    const mockUser = {
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: faker.internet.email(),
      age: faker.number.int(100),
      password: faker.internet.password(),
    };

    // 1 registrarlo
    it('Debe registrar un usuario', async () => {
      // cambiar las cosas de auth a register
      const { _body } = await requester.post('/auth/register').set(mockUser);
      console.log(_body)
      expect(_body);
    });

    // 2 loguear
    /* it('Debe loggear un user y DEVOLVER UNA COOKIE', async () => {
      const result = await requester.post('/auth/login').send({
        email: mockUser.email,
        password: mockUser.password,
      });

      const cookie = result.headers['set-cookie'][0];
      expect(cookie).to.be.ok;

      cookieName = cookie.split('=')[0];
      cookieValue = cookie.split('=')[1];

      expect(cookieName).to.be.ok.and.eql('coderCookie');
      expect(cookieValue).to.be.ok
    });

    // 3 current
    it('Enviar cookie para ver el contenido del user', async () => {
      const {_body} = await requester.get('/api/sessions/current').set('Cookie', [`${cookieName}=${cookieValue}`])
      expect(_body.payload.email).to.be.eql(mockUser.email)
    }); */
  });
});
