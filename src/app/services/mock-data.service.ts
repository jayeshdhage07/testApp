import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { faker } from '@faker-js/faker';
import { environment } from '../../environments/environment';
import { User } from '../model/user.model';
import { Enquiry } from '../model/enquiry.model';
import { Product } from '../model/product.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // ----------------- Users -----------------
  private generateRandomUser(): User {
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

  // Example: fetch users from API if baseUrl exists, else use Faker
  getUsers(count: number = 5): Observable<User[]> {
    if (this.baseUrl) {
      return this.http.get<User[]>(`${this.baseUrl}/users`);
    } else {
      return of(this.generateRandomUsers(count));
    }
  }

  // ----------------- Enquiries -----------------
  generateFakeEnquiry(): Enquiry {
    return {
      name: faker.person.fullName(),
      mobileNumber: faker.phone.number(),
      email: faker.internet.email(),
      enquiryMessage: faker.lorem.sentence(),
    };
  }

  submitFakeEnquiry(enquiry: Enquiry): Observable<{ success: boolean, data: Enquiry }> {
    if (this.baseUrl) {
      return this.http.post<{ success: boolean, data: Enquiry }>(
        `${this.baseUrl}/enquiries`,
        enquiry
      );
    } else {
      return new Observable((observer) => {
        console.log('Submitting Enquiry (Faker):', enquiry);
        setTimeout(() => {
          observer.next({ success: true, data: enquiry });
          observer.complete();
        }, 1000);
      });
    }
  }

  // ----------------- Products -----------------
  private generateProduct(): Product {
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

  getProducts(count: number = 5): Observable<Product[]> {
    if (this.baseUrl) {
      return this.http.get<Product[]>(`${this.baseUrl}/products`);
    } else {
      return of(this.generateProducts(count));
    }
  }
}
