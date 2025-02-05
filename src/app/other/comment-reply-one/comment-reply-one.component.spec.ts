import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentReplyOneComponent } from './comment-reply-one.component';

describe('CommentReplyOneComponent', () => {
  let component: CommentReplyOneComponent;
  let fixture: ComponentFixture<CommentReplyOneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommentReplyOneComponent]
    });
    fixture = TestBed.createComponent(CommentReplyOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
