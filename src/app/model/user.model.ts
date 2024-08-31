// src/app/models/user.model.ts

export interface Location {
    street: string;
    city: string;
    country: string;
  }
  
  export interface User {
    id: string;
    name: string;
    email: string;
    avatar: string;
    location: Location;
  }
  