import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BorrowOptionsPage } from './borrow-options.page';

describe('BorrowOptionsPage', () => {
  let component: BorrowOptionsPage;
  let fixture: ComponentFixture<BorrowOptionsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BorrowOptionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
