import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogActuComponent } from './log-actu.component';

describe('LogActuComponent', () => {
  let component: LogActuComponent;
  let fixture: ComponentFixture<LogActuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogActuComponent]
    });
    fixture = TestBed.createComponent(LogActuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
