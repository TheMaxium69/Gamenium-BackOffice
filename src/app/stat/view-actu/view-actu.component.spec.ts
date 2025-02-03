import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewActuComponent } from './view-actu.component';

describe('ViewActuComponent', () => {
  let component: ViewActuComponent;
  let fixture: ComponentFixture<ViewActuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewActuComponent]
    });
    fixture = TestBed.createComponent(ViewActuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
