import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '../../../interfacess/customer';
import { CustomerService } from '../../../services/customer-service';

@Component({
  selector: 'app-list-customers',
  standalone: false,
  templateUrl: './list-customers.html',
  styleUrl: './list-customers.css',
})
export class ListCustomers implements OnInit {
  customers: Customer[] = [];
  loading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private customerService: CustomerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.loading = true;
    this.errorMessage = '';
    this.customerService.getAllCustomers().subscribe({
      next: data => {
        this.customers = data;
        this.loading = false;
        console.log("All Customers => ", this.customers);
      },
      error: err => {
        console.log(err);
        this.errorMessage = 'Failed to load customers.';
        this.loading = false;
      }
    });
  }

  editCustomer(id: number | undefined): void {
    if (id) {
      this.router.navigate(['/update-customer', id]);
    }
  }

  deleteCustomer(id: number | undefined, name: string): void {
    if (!id) return;

    if (confirm(`Are you sure you want to delete customer "${name}"?`)) {
      this.customerService.deleteCustomer(id).subscribe({
        next: () => {
          this.successMessage = 'Customer deleted successfully!';
          this.loadCustomers();
          setTimeout(() => {
            this.successMessage = '';
          }, 3000);
        },
        error: (error) => {
          console.error('Error deleting customer:', error);
          this.errorMessage = 'Failed to delete customer.';
        }
      });
    }
  }

  addCustomer(): void {
    this.router.navigate(['/add-customer']);
  }
}
