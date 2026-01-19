import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BillingService } from '../../../services/billing-service';
import { CustomerService } from '../../../services/customer-service';
import { ProductService } from '../../../services/product-service';
import { Customer } from '../../../interfacess/customer';
import { Product } from '../../../interfacess/product';
import { BillRequest } from '../../../interfacess/bill';

interface ProductItemForm {
    productId: string;
    quantity: number;
    unitPrice: number;
}

@Component({
    selector: 'add-bill',
    standalone: false,
    templateUrl: './add-bill.html',
    styleUrls: ['./add-bill.css']
})
export class AddBill implements OnInit {
    customers: Customer[] = [];
    products: Product[] = [];
    selectedCustomerId: number = 0;
    productItems: ProductItemForm[] = [];
    loading: boolean = false;
    errorMessage: string = '';
    successMessage: string = '';

    constructor(
        private billingService: BillingService,
        private customerService: CustomerService,
        private productService: ProductService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.loadCustomers();
        this.loadProducts();
        this.addProductItem();
    }

    loadCustomers(): void {
        this.customerService.getAllCustomers().subscribe({
            next: (data) => {
                this.customers = data;
            },
            error: (error) => {
                console.error('Error loading customers:', error);
                this.errorMessage = 'Failed to load customers.';
            }
        });
    }

    loadProducts(): void {
        this.productService.getAllProductsInStock().subscribe({
            next: (data) => {
                this.products = data;
            },
            error: (error) => {
                console.error('Error loading products:', error);
                this.errorMessage = 'Failed to load products.';
            }
        });
    }

    addProductItem(): void {
        this.productItems.push({
            productId: '',
            quantity: 1,
            unitPrice: 0
        });
    }

    removeProductItem(index: number): void {
        if (this.productItems.length > 1) {
            this.productItems.splice(index, 1);
        }
    }

    onProductChange(index: number): void {
        const productId = this.productItems[index].productId;
        const product = this.products.find(p => p.id === productId);
        if (product) {
            this.productItems[index].unitPrice = product.price;
        }
    }

    calculateItemTotal(item: ProductItemForm): number {
        return item.quantity * item.unitPrice;
    }

    calculateGrandTotal(): number {
        return this.productItems.reduce((sum, item) => sum + this.calculateItemTotal(item), 0);
    }

    isFormValid(): boolean {
        if (this.selectedCustomerId === 0) return false;
        if (this.productItems.length === 0) return false;

        for (const item of this.productItems) {
            if (!item.productId || item.quantity <= 0) {
                return false;
            }
        }
        return true;
    }

    createBill(): void {
        if (!this.isFormValid()) {
            this.errorMessage = 'Please fill all required fields correctly.';
            return;
        }

        this.loading = true;
        this.errorMessage = '';
        this.successMessage = '';

        const billRequest: BillRequest = {
            billingDate: new Date(),
            customerId: this.selectedCustomerId,
            productItems: this.productItems.map(item => ({
                productId: item.productId,
                quantity: item.quantity,
                unitPrice: item.unitPrice
            }))
        };

        this.billingService.createBill(billRequest).subscribe({
            next: (response) => {
                this.successMessage = 'Bill created successfully!';
                this.loading = false;
                this.router.navigate(['/bills']);
            },
            error: (error) => {
                console.error('Error creating bill:', error);
                this.errorMessage = 'Failed to create bill. Please try again.';
                this.loading = false;
            }
        });
    }

    cancel(): void {
        this.router.navigate(['/bills']);
    }
}
