import { TestBed } from '@angular/core/testing';

import { LogCommentService } from './log-comment.service';

describe('LogCommentService', () => {
  let service: LogCommentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogCommentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
