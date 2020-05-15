import { TestBed } from '@angular/core/testing';

import { PersonalReferenceService } from './personal-reference.service';

describe('PersonalReferenceService', () => {
  let service: PersonalReferenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonalReferenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
