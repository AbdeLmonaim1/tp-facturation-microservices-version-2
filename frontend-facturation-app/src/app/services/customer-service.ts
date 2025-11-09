import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../interfacess/product';
import {Customer} from '../interfacess/customer';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private API_URL = 'http://localhost:8888/customer-service/api/customers';
  constructor(private http: HttpClient) {
  }
  getAllCustomers():Observable<Customer[]> {
    return this.http.get<Customer[]>(this.API_URL);
  }
  addCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.API_URL, customer);
  }
}
