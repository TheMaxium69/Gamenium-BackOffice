import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModoCommentReplyComponent } from './modo-comment-reply.component';

describe('ModoCommentReplyComponent', () => {
  let component: ModoCommentReplyComponent;
  let fixture: ComponentFixture<ModoCommentReplyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModoCommentReplyComponent]
    });
    fixture = TestBed.createComponent(ModoCommentReplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
