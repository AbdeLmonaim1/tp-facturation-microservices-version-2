import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bill, BillRequest } from '../interfacess/bill';

@Injectable({
    providedIn: 'root',
})
export class BillingService {
    private API_URL = 'http://localhost:8888/billing-service/api/billing';

    constructor(private http: HttpClient) { }

    getAllBills(): Observable<Bill[]> {
        return this.http.get<Bill[]>(this.API_URL);
    }

    getBillById(id: number): Observable<Bill> {
        return this.http.get<Bill>(`${this.API_URL}/${id}`);
    }

    createBill(bill: BillRequest): Observable<Bill> {
        return this.http.post<Bill>(this.API_URL, bill);
    }
}
