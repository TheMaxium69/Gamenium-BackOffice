import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProviderComponent } from './view-provider.component';

describe('ViewProviderComponent', () => {
  let component: ViewProviderComponent;
  let fixture: ComponentFixture<ViewProviderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewProviderComponent]
    });
    fixture = TestBed.createComponent(ViewProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
