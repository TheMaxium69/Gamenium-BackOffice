import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HmpPreviewComponent } from './hmp-preview.component';

describe('HmpPreviewComponent', () => {
  let component: HmpPreviewComponent;
  let fixture: ComponentFixture<HmpPreviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HmpPreviewComponent]
    });
    fixture = TestBed.createComponent(HmpPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
