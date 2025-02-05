import { TestBed } from '@angular/core/testing';

import { LogActuService } from '../-service/log-actu.service';

describe('LogActuService', () => {
  let service: LogActuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogActuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
