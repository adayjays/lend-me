import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LendItemPage } from './lend-item.page';

describe('LendItemPage', () => {
  let component: LendItemPage;
  let fixture: ComponentFixture<LendItemPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LendItemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
