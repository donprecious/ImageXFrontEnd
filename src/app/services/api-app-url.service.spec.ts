import { TestBed } from '@angular/core/testing';

import { ApiAppUrlService } from './api-app-url.service';

describe('ApiAppUrlService', () => {
  let service: ApiAppUrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiAppUrlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
