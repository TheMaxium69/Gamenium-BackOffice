import { TestBed } from '@angular/core/testing';

import { SelectedArticleService } from '../-service/selected-article.service';

describe('SelectedArticleService', () => {
  let service: SelectedArticleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectedArticleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
