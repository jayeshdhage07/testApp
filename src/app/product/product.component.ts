import { Component, OnInit } from '@angular/core';
import { MockDataService } from '../services/mock-data.service';
import { CommonModule } from '@angular/common';
import { Product } from '../model/product.model';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {
  constructor(private mockapi:MockDataService){}
  products: Product[] = [];
  ngOnInit():void{
    this.products = this.mockapi.generateProducts(10)
   }
}
