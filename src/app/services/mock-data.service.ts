import { Injectable } from '@angular/core';
import { faker } from '@faker-js/faker';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {

  constructor() {}

  generateRandomUser(): User { 
    return {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
      location: {
        street: faker.location.streetAddress(),
        city: faker.location.city(),
        country: faker.location.country()
      }
    };
  }

  generateRandomUsers(count: number): User[] {
    const users: User[] = [];
    for (let i = 0; i < count; i++) {
      users.push(this.generateRandomUser());
    }
    return users;
  }
}
