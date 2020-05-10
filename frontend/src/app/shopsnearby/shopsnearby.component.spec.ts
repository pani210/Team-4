import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopsnearbyComponent } from './shopsnearby.component';

describe('ShopsnearbyComponent', () => {
  let component: ShopsnearbyComponent;
  let fixture: ComponentFixture<ShopsnearbyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopsnearbyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopsnearbyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
