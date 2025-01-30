import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActuPreviewComponent } from './actu-preview.component';

describe('ActuPreviewComponent', () => {
  let component: ActuPreviewComponent;
  let fixture: ComponentFixture<ActuPreviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActuPreviewComponent]
    });
    fixture = TestBed.createComponent(ActuPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
