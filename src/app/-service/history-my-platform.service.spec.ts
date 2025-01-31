import { TestBed } from '@angular/core/testing';

import { HistoryMyPlatformService } from './history-my-platform.service';

describe('HistoryMyPlatformService', () => {
  let service: HistoryMyPlatformService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoryMyPlatformService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
