import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HmgPreviewComponent } from './hmg-preview.component';

describe('HmgPreviewComponent', () => {
  let component: HmgPreviewComponent;
  let fixture: ComponentFixture<HmgPreviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HmgPreviewComponent]
    });
    fixture = TestBed.createComponent(HmgPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
