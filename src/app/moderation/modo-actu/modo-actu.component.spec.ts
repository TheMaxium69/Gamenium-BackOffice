import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModoActuComponent } from './modo-actu.component';

describe('ModoActuComponent', () => {
  let component: ModoActuComponent;
  let fixture: ComponentFixture<ModoActuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModoActuComponent]
    });
    fixture = TestBed.createComponent(ModoActuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
