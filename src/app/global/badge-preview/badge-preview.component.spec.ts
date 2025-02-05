import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BadgePreviewComponent } from './badge-preview.component';

describe('BadgePreviewComponent', () => {
  let component: BadgePreviewComponent;
  let fixture: ComponentFixture<BadgePreviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BadgePreviewComponent]
    });
    fixture = TestBed.createComponent(BadgePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
