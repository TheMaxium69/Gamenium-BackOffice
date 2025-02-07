import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentSearchComponent } from './comment-search.component';

describe('CommentSearchComponent', () => {
  let component: CommentSearchComponent;
  let fixture: ComponentFixture<CommentSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommentSearchComponent]
    });
    fixture = TestBed.createComponent(CommentSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
