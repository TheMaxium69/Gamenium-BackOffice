import { TestBed } from '@angular/core/testing';

import { LogRoleService } from './log-role.service';

describe('LogRoleService', () => {
  let service: LogRoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogRoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
