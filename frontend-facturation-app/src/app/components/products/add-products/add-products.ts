import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-products',
  standalone: false,
  templateUrl: './add-products.html',
  styleUrl: './add-products.css',
})
export class AddProducts implements OnInit {
  myFormAddProduct!: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {
  }
  ngOnInit(): void {
    this.initMyFormAddProduct();
  }
  private initMyFormAddProduct() {
    this.myFormAddProduct = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required],
    })
  }


  onAddProduct() {
    const { name, price, quantity } = this.myFormAddProduct.value;
    const payload = {
      name: name,
      price: price,
      quantity: quantity,
    };
    console.log('Payload to add product:', payload);
    this.productService.addProduct(payload).subscribe({
      next: (response) => {
        console.log('Product added successfully:', response);
        this.myFormAddProduct.reset();
        this.router.navigate(['/products']);
      },
      error: (error) => {
        console.error('Error adding product:', error);
      }
    })
  }
}
