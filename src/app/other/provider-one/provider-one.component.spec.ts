import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderOneComponent } from './provider-one.component';

describe('ProviderOneComponent', () => {
  let component: ProviderOneComponent;
  let fixture: ComponentFixture<ProviderOneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProviderOneComponent]
    });
    fixture = TestBed.createComponent(ProviderOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
