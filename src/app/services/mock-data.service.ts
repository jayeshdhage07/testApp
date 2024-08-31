import { Injectable } from '@angular/core';
import { faker } from '@faker-js/faker';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {

  constructor() {}

  generateRandomUser() {
    return {
      id: faker.datatype.uuid(),
      name: faker.name.fullName(),
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
      address: {
        street: faker.address.streetAddress(),
        city: faker.address.city(),
        country: faker.address.country()
      }
    };
  }

  generateRandomUsers(count: number) {
    const users = [];
    for (let i = 0; i < count; i++) {
      users.push(this.generateRandomUser());
    }
    return users;
  }
}
