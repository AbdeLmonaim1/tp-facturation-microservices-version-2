import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../../services/customer-service';
import { Customer } from '../../../interfacess/customer';

@Component({
  selector: 'app-update-customer',
  standalone: false,
  templateUrl: './update-customer.html',
  styleUrl: './update-customer.css',
})
export class UpdateCustomer implements OnInit {
  customer: Customer = { name: '', email: '' };
  customerId: number = 0;
  loading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.customerId = +params['id'];
      if (this.customerId) {
        this.loadCustomer();
      }
    });
  }

  loadCustomer(): void {
    this.loading = true;
    this.customerService.getCustomerById(this.customerId).subscribe({
      next: (data) => {
        this.customer = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading customer:', error);
        this.errorMessage = 'Failed to load customer details.';
        this.loading = false;
      }
    });
  }

  updateCustomer(): void {
    if (!this.customer.name || !this.customer.email) {
      this.errorMessage = 'Please fill all required fields.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.customerService.updateCustomer(this.customerId, this.customer).subscribe({
      next: (response) => {
        this.successMessage = 'Customer updated successfully!';
        this.loading = false;
        setTimeout(() => {
          this.router.navigate(['/customers']);
        }, 1500);
      },
      error: (error) => {
        console.error('Error updating customer:', error);
        this.errorMessage = 'Failed to update customer. Please try again.';
        this.loading = false;
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/customers']);
  }
}
