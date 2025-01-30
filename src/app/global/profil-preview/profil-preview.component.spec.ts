import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilPreviewComponent } from './profil-preview.component';

describe('ProfilPreviewComponent', () => {
  let component: ProfilPreviewComponent;
  let fixture: ComponentFixture<ProfilPreviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilPreviewComponent]
    });
    fixture = TestBed.createComponent(ProfilPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
