import { TestBed } from '@angular/core/testing';

import { FileupladService } from './fileuplad.service';

describe('FileupladService', () => {
  let service: FileupladService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileupladService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
