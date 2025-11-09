import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductList} from './components/products/product-list/product-list';
import {AuthGuard} from './guards/auth-guard';
import {AddProducts} from './components/products/add-products/add-products';
import {ListCustomers} from './components/customers/list-customers/list-customers';
import {AddCustomer} from './components/customers/add-customer/add-customer';

const routes: Routes = [
  {path: 'products', component: ProductList, canActivate: [AuthGuard], data: {roles: ['ADMIN']}},
  {path: 'add-product', component: AddProducts, canActivate: [AuthGuard], data: {roles: ['ADMIN']}},
  {path: 'customers', component: ListCustomers, canActivate: [AuthGuard], data: {roles: ['ADMIN']}},
  {path: 'add-customer', component: AddCustomer, canActivate: [AuthGuard], data: {roles: ['ADMIN']}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
