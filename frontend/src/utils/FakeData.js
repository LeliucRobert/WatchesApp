/** @format */

import { faker } from "@faker-js/faker";

export const generateFakeWatch = () => ({
  id: faker.string.uuid(),
  name: faker.commerce.productName() + " Watch",
  price: faker.commerce.price({ min: 50, max: 10000 }),
  category: faker.helpers.arrayElement(["luxury", "sport", "casual"]),
  condition: faker.helpers.arrayElement(["new", "used", "vintage", "like-new"]),
  description: faker.commerce.productDescription(),
  seller: faker.company.name(),
  images: [faker.image.url(), faker.image.url()],
});

export const generateFakeWatches = (count = 20) =>
  Array.from({ length: count }, () => generateFakeWatch());
