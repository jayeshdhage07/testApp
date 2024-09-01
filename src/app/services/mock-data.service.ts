import { Injectable } from '@angular/core';
import { faker } from '@faker-js/faker';
import { User } from '../model/user.model';
import { Enquiry } from '../model/enquiry.model';
import { Product } from '../model/product.model';

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

    // Method to generate a single fake enquiry
    generateFakeEnquiry(): Enquiry {
      return {
        name: faker.person.fullName(),
        mobileNumber: faker.phone.number(),
        email: faker.internet.email(),
        enquiryMessage: faker.lorem.sentence(),
      };
    }
  
    // Method to simulate a fake POST API
    submitFakeEnquiry(enquiry: Enquiry): Promise<{ success: boolean, data: Enquiry }> {
      return new Promise((resolve) => {
        console.log('Submitting Enquiry:', enquiry);
        // Simulate an API call with a delay
        setTimeout(() => {
          resolve({ success: true, data: enquiry });
        }, 1000);  // 1-second delay
      });
    }

    generateProduct(): Product { 
      return {
        productImage: faker.image.avatar(),
        productName: faker.commerce.productName(),
        productDescription: faker.commerce.productDescription(),
        productMaterial: faker.commerce.productMaterial(),
        productAdjective: faker.commerce.productAdjective()
      };
    }
  
    generateProducts(count: number): Product[] {
      const products: Product[] = [];
      for (let i = 0; i < count; i++) {
        products.push(this.generateProduct());
      }
      return products;
    }
}
