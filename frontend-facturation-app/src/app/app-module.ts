import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { App } from './app';
import { ProductList } from './components/products/product-list/product-list';
import { AddProducts } from './components/products/add-products/add-products';
import { UpdateProduct } from './components/products/update-product/update-product';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app-routing-module';
import {Navbar} from './components/navbar/navbar';


@NgModule({
  declarations: [
    App,
    ProductList,
    AddProducts,
    UpdateProduct,
    Navbar
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection()
  ],
  bootstrap: [App]
})
export class AppModule { }
