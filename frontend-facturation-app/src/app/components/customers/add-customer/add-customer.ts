import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../../../services/product-service';
import {CustomerService} from '../../../services/customer-service';

@Component({
  selector: 'app-add-customer',
  standalone: false,
  templateUrl: './add-customer.html',
  styleUrl: './add-customer.css',
})
export class AddCustomer implements OnInit{
  myFormAddCustomer!: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private customerService: CustomerService,
  ) {
  }
  ngOnInit(): void {
    this.initMyFormAddCustomer();
  }
  private initMyFormAddCustomer(){
    this.myFormAddCustomer = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],

    })
  }


  onAddCustomer() {
    const {name, email} = this.myFormAddCustomer.value;
    const payload = {
      name: name,
      email: email,

    };
    console.log('Payload to add product:', payload);
    this.customerService.addCustomer(payload).subscribe({
      next: (response) => {
        console.log('Customer added successfully:', response);
        this.myFormAddCustomer.reset();
      },
      error: (error) => {
        console.error('Error adding product:', error);
      }
    })
  }
}
