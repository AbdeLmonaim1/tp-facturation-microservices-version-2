import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductList } from './components/products/product-list/product-list';
import { AuthGuard } from './guards/auth-guard';
import { AddProducts } from './components/products/add-products/add-products';
import { ListCustomers } from './components/customers/list-customers/list-customers';
import { AddCustomer } from './components/customers/add-customer/add-customer';
import { UpdateProduct } from './components/products/update-product/update-product';
import { UpdateCustomer } from './components/customers/update-customer/update-customer';
import { ListBills } from './components/bills/list-bills/list-bills';
import { AddBill } from './components/bills/add-bill/add-bill';
import { BillDetails } from './components/bills/bill-details/bill-details';

const routes: Routes = [
  { path: 'products', component: ProductList, canActivate: [AuthGuard], data: { roles: ['ADMIN'] } },
  { path: 'add-product', component: AddProducts, canActivate: [AuthGuard], data: { roles: ['ADMIN'] } },
  { path: 'update-product/:id', component: UpdateProduct, canActivate: [AuthGuard], data: { roles: ['ADMIN'] } },
  { path: 'customers', component: ListCustomers, canActivate: [AuthGuard], data: { roles: ['ADMIN'] } },
  { path: 'add-customer', component: AddCustomer, canActivate: [AuthGuard], data: { roles: ['ADMIN'] } },
  { path: 'update-customer/:id', component: UpdateCustomer, canActivate: [AuthGuard], data: { roles: ['ADMIN'] } },
  { path: 'bills', component: ListBills, canActivate: [AuthGuard], data: { roles: ['ADMIN'] } },
  { path: 'add-bill', component: AddBill, canActivate: [AuthGuard], data: { roles: ['ADMIN'] } },
  { path: 'bill-details/:id', component: BillDetails, canActivate: [AuthGuard], data: { roles: ['ADMIN'] } },
  { path: '', redirectTo: '/products', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
