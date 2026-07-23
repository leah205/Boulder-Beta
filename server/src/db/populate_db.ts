import { faker, fakerSK } from "@faker-js/faker";

export function createRandomUser() {
  return {
    id: faker.string.uuid(),
    username: faker.internet.username(),
    password: faker.internet.password(),
  };
}

const users = fakerSK.helpers.multiple(createRandomUser, {
  count: 5,
});
