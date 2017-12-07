import {TestBed, inject} from '@angular/core/testing';

import {CountmaticApiService} from './countmatic-api.service';

describe('CountmaticApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CountmaticApiService]
    });
  });

  it('should be created', inject([CountmaticApiService], (service: CountmaticApiService) => {
    expect(service).toBeTruthy();
  }));
});
