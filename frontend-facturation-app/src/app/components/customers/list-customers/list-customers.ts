import {Component, OnInit} from '@angular/core';
import {Product} from '../../../interfacess/product';
import {ProductService} from '../../../services/product-service';
import {Customer} from '../../../interfacess/customer';
import {CustomerService} from '../../../services/customer-service';

@Component({
  selector: 'app-list-customers',
  standalone: false,
  templateUrl: './list-customers.html',
  styleUrl: './list-customers.css',
})
export class ListCustomers implements OnInit{
  customers!:Customer[];
  constructor(private customerService: CustomerService) {
  }
  ngOnInit(): void {
    this.getAllProducts();
  }
  getAllProducts(){
    this.customerService.getAllCustomers().subscribe({
      next: data =>{
        this.customers = data;
        console.log("All Customers in stock => ",this.customers);
      },
      error: err => {
        console.log(err);
      }
    })
  }

}
