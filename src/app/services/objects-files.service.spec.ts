import { TestBed } from '@angular/core/testing';

import { ObjectsFilesService } from './objects-files.service';

describe('ObjectsFilesService', () => {
  let service: ObjectsFilesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObjectsFilesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
