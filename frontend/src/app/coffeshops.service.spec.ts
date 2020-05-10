import { TestBed } from '@angular/core/testing';

import { CoffeshopsService } from './coffeshops.service';

describe('CoffeshopsService', () => {
  let service: CoffeshopsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoffeshopsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
