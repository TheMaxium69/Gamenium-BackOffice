import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActuOneComponent } from './actu-one.component';

describe('ActuOneComponent', () => {
  let component: ActuOneComponent;
  let fixture: ComponentFixture<ActuOneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActuOneComponent]
    });
    fixture = TestBed.createComponent(ActuOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
