import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderActuComponent } from './leader-actu.component';

describe('LeaderActuComponent', () => {
  let component: LeaderActuComponent;
  let fixture: ComponentFixture<LeaderActuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeaderActuComponent]
    });
    fixture = TestBed.createComponent(LeaderActuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
