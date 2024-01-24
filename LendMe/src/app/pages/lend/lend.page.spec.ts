import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LendPage } from './lend.page';

describe('LendPage', () => {
  let component: LendPage;
  let fixture: ComponentFixture<LendPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LendPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
