/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GooglePlaceService } from './google-place.service';

describe('Service: GooglePlace', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GooglePlaceService]
    });
  });

  it('should ...', inject([GooglePlaceService], (service: GooglePlaceService) => {
    expect(service).toBeTruthy();
  }));
});
