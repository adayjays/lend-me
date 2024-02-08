import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BorrowItemPage } from './borrow-item.page';

describe('BorrowItemPage', () => {
  let component: BorrowItemPage;
  let fixture: ComponentFixture<BorrowItemPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BorrowItemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
