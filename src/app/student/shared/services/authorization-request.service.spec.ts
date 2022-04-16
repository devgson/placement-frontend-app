import { TestBed } from '@angular/core/testing';

import { AuthorizationRequestService } from './authorization-request.service';

describe('AuthorizationRequestService', () => {
  let service: AuthorizationRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthorizationRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
