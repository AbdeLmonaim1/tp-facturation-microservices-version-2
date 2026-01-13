import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BillingService } from '../../../services/billing-service';
import { Bill } from '../../../interfacess/bill';

@Component({
    selector: 'list-bills',
    standalone: false,
    templateUrl: './list-bills.html',
    styleUrls: ['./list-bills.css']
})
export class ListBills implements OnInit {
    bills: Bill[] = [];
    loading: boolean = false;
    errorMessage: string = '';

    constructor(
        private billingService: BillingService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.loadBills();
    }

    loadBills(): void {
        this.loading = true;
        this.errorMessage = '';
        this.billingService.getAllBills().subscribe({
            next: (data) => {
                this.bills = data;
                this.loading = false;
            },
            error: (error) => {
                console.error('Error loading bills:', error);
                this.errorMessage = 'Failed to load bills. Please try again.';
                this.loading = false;
            }
        });
    }

    viewBillDetails(id: number | undefined): void {
        if (id) {
            this.router.navigate(['/bill-details', id]);
        }
    }

    createNewBill(): void {
        this.router.navigate(['/add-bill']);
    }

    calculateTotal(bill: Bill): number {
        if (!bill.productItems || bill.productItems.length === 0) {
            return 0;
        }
        return bill.productItems.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
    }

    formatDate(date: Date): string {
        return new Date(date).toLocaleDateString('fr-FR');
    }
}
