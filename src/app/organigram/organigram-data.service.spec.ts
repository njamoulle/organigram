/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OrganigramDataService } from './organigram-data.service';

describe('Service: OrganigramData', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrganigramDataService]
    });
  });

  it('should ...', inject([OrganigramDataService], (service: OrganigramDataService) => {
    expect(service).toBeTruthy();
  }));
});
