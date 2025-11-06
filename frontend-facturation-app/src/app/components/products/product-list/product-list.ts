import {Component, OnInit} from '@angular/core';
import {Product} from '../../../interfacess/product';
import {ProductService} from '../../../services/product-service';


@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList implements OnInit{
  products!:Product[];
  constructor(private productService: ProductService) {
  }
  ngOnInit(): void {
    this.getAllProducts();
  }
  getAllProducts(){
    this.productService.getAllProductsInStock().subscribe({
      next: data =>{
        this.products = data;
        console.log("All Products in stock => ",this.products);
      },
      error: err => {
        console.log(err);
      }
    })
  }


}
