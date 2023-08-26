import { faker } from '@faker-js/faker';

export const generateProduct = () => {
  const products = [];

  for (let i = 0; i <= 100; i++) {
    products.push(generate());
  }

  return products;
};

const generate = () => {
  return {
    id: faker.database.mongodbObjectId(),
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription,
    price: faker.commerce.price(),
    thubmail: faker.image.url(),
    code: faker.database.mongodbObjectId(),
    stock: faker.number.int({ max: 50 }),
  };
};
