import { Customer } from './customer';
import { Product } from './product';

export interface ProductItem {
  id?: number;
  productId: string;
  unitPrice: number;
  quantity: number;
  product?: Product;
}

export interface Bill {
  id?: number;
  billingDate: Date;
  customerId: number;
  customer?: Customer;
  productItems: ProductItem[];
}

export interface BillRequest {
  billingDate: Date;
  customerId: number;
  productItems: {
    productId: string;
    quantity: number;
    unitPrice: number;
  }[];
}
