import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentOneComponent } from './comment-one.component';

describe('CommentOneComponent', () => {
  let component: CommentOneComponent;
  let fixture: ComponentFixture<CommentOneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommentOneComponent]
    });
    fixture = TestBed.createComponent(CommentOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
