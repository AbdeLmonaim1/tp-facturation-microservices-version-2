import {
  APP_INITIALIZER,
  NgModule,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { App } from './app';
import { ProductList } from './components/products/product-list/product-list';
import { AddProducts } from './components/products/add-products/add-products';
import { UpdateProduct } from './components/products/update-product/update-product';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing-module';
import { Navbar } from './components/navbar/navbar';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { ListCustomers } from './components/customers/list-customers/list-customers';
import { AddCustomer } from './components/customers/add-customer/add-customer';
import { UpdateCustomer } from './components/customers/update-customer/update-customer';
import { FormsModule } from '@angular/forms';
import {ListBills} from './components/bills/list-bills/list-bills';
import {AddBill} from './components/bills/add-bill/add-bill';
import {BillDetails} from './components/bills/bill-details/bill-details';

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8080',
        realm: 'tp-facturation-realm',
        clientId: 'tp-facturation-angular-frontend-client'
      },
      initOptions: {
        onLoad: 'login-required',
        silentCheckSsoRedirectUri:
          window.location.origin + '/silent-check-sso.html'
      },
    });
}


@NgModule({
  declarations: [
    App,
    ProductList,
    AddProducts,
    UpdateProduct,
    Navbar,
    ListCustomers,
    AddCustomer,
    UpdateCustomer,
    ListBills,
    AddBill,
    BillDetails

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    KeycloakAngularModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    }
  ],
  bootstrap: [App]
})
export class AppModule { }
