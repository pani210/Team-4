import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoffeeshoplocationComponent } from './coffeeshoplocation.component';

describe('CoffeeshoplocationComponent', () => {
  let component: CoffeeshoplocationComponent;
  let fixture: ComponentFixture<CoffeeshoplocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoffeeshoplocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoffeeshoplocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
