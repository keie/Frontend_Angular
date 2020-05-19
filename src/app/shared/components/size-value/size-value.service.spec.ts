import { TestBed } from '@angular/core/testing';

import { SizeValueService } from './size-value.service';

describe('SizeValueService', () => {
  let service: SizeValueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SizeValueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
