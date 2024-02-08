import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LendOptionsPage } from './lend-options.page';

describe('LendOptionsPage', () => {
  let component: LendOptionsPage;
  let fixture: ComponentFixture<LendOptionsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LendOptionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
