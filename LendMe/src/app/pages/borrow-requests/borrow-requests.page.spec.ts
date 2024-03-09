import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BorrowRequestsPage } from './borrow-requests.page';

describe('BorrowRequestsPage', () => {
  let component: BorrowRequestsPage;
  let fixture: ComponentFixture<BorrowRequestsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BorrowRequestsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
