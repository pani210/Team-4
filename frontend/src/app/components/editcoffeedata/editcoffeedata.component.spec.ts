import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcoffeedataComponent } from './editcoffeedata.component';

describe('EditcoffeedataComponent', () => {
  let component: EditcoffeedataComponent;
  let fixture: ComponentFixture<EditcoffeedataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditcoffeedataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditcoffeedataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
