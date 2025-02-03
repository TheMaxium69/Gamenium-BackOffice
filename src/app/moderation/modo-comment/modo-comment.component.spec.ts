import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModoCommentComponent } from './modo-comment.component';

describe('ModoCommentComponent', () => {
  let component: ModoCommentComponent;
  let fixture: ComponentFixture<ModoCommentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModoCommentComponent]
    });
    fixture = TestBed.createComponent(ModoCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
