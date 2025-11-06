import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../interfacess/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private API_URL = 'http://localhost:8888/inventory-service/api/products';
  constructor(private http: HttpClient) {
  }
  getAllProductsInStock():Observable<Product[]> {
    return this.http.get<Product[]>(this.API_URL);
  }
}
