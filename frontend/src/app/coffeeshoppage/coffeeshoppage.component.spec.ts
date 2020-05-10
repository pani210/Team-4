import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoffeeshoppageComponent } from './coffeeshoppage.component';

describe('CoffeeshoppageComponent', () => {
  let component: CoffeeshoppageComponent;
  let fixture: ComponentFixture<CoffeeshoppageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoffeeshoppageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoffeeshoppageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
