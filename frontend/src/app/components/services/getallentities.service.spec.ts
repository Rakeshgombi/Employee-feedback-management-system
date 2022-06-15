import { TestBed } from '@angular/core/testing';

import { GetAllEntitiesService } from './getallentities.service';

describe('GetAllEntitiesService', () => {
  let service: GetAllEntitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetAllEntitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
