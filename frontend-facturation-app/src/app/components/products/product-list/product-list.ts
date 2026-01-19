import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { Product } from '../../../interfacess/product';
import { ProductService } from '../../../services/product-service';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList implements OnInit {
  products: Product[] = [];
  loading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private productService: ProductService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.errorMessage = '';
    this.productService.getAllProductsInStock()
      .pipe(finalize(() => {
        this.loading = false;
        this.cdr.detectChanges(); // Ensure view updates when loading finishes
      }))
      .subscribe({
        next: data => {
          this.products = data;
          console.log("All Products in stock => ", this.products);
        },
        error: err => {
          console.log(err);
          this.errorMessage = 'Failed to load products.';
        }
      });
  }

  editProduct(id: string | undefined): void {
    if (id) {
      this.router.navigate(['/update-product', id]);
    }
  }

  deleteProduct(id: string | undefined, name: string): void {
    if (!id) return;

    if (confirm(`Are you sure you want to delete product "${name}"?`)) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          this.successMessage = 'Product deleted successfully!';
          this.loadProducts();
          setTimeout(() => {
            this.successMessage = '';
          }, 3000);
        },
        error: (error) => {
          console.error('Error deleting product:', error);
          this.errorMessage = 'Failed to delete product.';
        }
      });
    }
  }

  addProduct(): void {
    this.router.navigate(['/add-product']);
  }

  getStockStatus(quantity: number): string {
    if (quantity === 0) return 'out-of-stock';
    if (quantity < 10) return 'low-stock';
    return 'in-stock';
  }

  getStockLabel(quantity: number): string {
    if (quantity === 0) return 'Out of Stock';
    if (quantity < 10) return 'Low Stock';
    return 'In Stock';
  }
}
