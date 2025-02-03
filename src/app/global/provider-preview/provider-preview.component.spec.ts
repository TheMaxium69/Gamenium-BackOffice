import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderPreviewComponent } from './provider-preview.component';

describe('ProviderComponent', () => {
  let component: ProviderPreviewComponent;
  let fixture: ComponentFixture<ProviderPreviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProviderPreviewComponent]
    });
    fixture = TestBed.createComponent(ProviderPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
