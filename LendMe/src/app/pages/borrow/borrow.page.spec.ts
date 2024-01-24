import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BorrowPage } from './borrow.page';

describe('BorrowPage', () => {
  let component: BorrowPage;
  let fixture: ComponentFixture<BorrowPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BorrowPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
