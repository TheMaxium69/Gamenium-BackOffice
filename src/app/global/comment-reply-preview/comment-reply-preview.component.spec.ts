import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentReplyPreviewComponent } from './comment-reply-preview.component';

describe('CommentReplyPreviewComponent', () => {
  let component: CommentReplyPreviewComponent;
  let fixture: ComponentFixture<CommentReplyPreviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommentReplyPreviewComponent]
    });
    fixture = TestBed.createComponent(CommentReplyPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
