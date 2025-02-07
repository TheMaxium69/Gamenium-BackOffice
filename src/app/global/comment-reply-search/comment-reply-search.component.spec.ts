import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentReplySearchComponent } from './comment-reply-search.component';

describe('CommentReplySearchComponent', () => {
  let component: CommentReplySearchComponent;
  let fixture: ComponentFixture<CommentReplySearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommentReplySearchComponent]
    });
    fixture = TestBed.createComponent(CommentReplySearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
