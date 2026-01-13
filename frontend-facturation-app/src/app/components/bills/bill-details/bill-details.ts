import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BillingService } from '../../../services/billing-service';
import { Bill } from '../../../interfacess/bill';

@Component({
    selector: 'bill-details',
    standalone: false,
    templateUrl: './bill-details.html',
    styleUrls: ['./bill-details.css']
})
export class BillDetails implements OnInit {
    bill: Bill | null = null;
    loading: boolean = false;
    errorMessage: string = '';
    billId: number = 0;

    constructor(
        private billingService: BillingService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.billId = +params['id'];
            if (this.billId) {
                this.loadBillDetails();
            }
        });
    }

    loadBillDetails(): void {
        this.loading = true;
        this.errorMessage = '';
        this.billingService.getBillById(this.billId).subscribe({
            next: (data) => {
                this.bill = data;
                this.loading = false;
            },
            error: (error) => {
                console.error('Error loading bill details:', error);
                this.errorMessage = 'Failed to load bill details. Please try again.';
                this.loading = false;
            }
        });
    }
  getTotalQuantity(): number {
    if (!this.bill || !this.bill.productItems) {
      return 0;
    }
    return this.bill.productItems.reduce((sum, item) => sum + item.quantity, 0);
  }

    calculateItemTotal(unitPrice: number, quantity: number): number {
        return unitPrice * quantity;
    }

    calculateGrandTotal(): number {
        if (!this.bill || !this.bill.productItems) {
            return 0;
        }
        return this.bill.productItems.reduce((sum, item) =>
            sum + this.calculateItemTotal(item.unitPrice, item.quantity), 0);
    }

    formatDate(date: Date): string {
        return new Date(date).toLocaleDateString('fr-FR');
    }

    goBack(): void {
        this.router.navigate(['/bills']);
    }

    printBill(): void {
        window.print();
    }
}
