import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListBills } from './list-bills';

describe('ListBills', () => {
    let component: ListBills;
    let fixture: ComponentFixture<ListBills>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ListBills]
        })
            .compileComponents();

        fixture = TestBed.createComponent(ListBills);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
