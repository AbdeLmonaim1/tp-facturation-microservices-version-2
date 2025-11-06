import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductList} from './components/products/product-list/product-list';

const routes: Routes = [
  {path: 'products', component: ProductList}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
