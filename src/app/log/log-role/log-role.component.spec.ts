import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogRoleComponent } from './log-role.component';

describe('LogRoleComponent', () => {
  let component: LogRoleComponent;
  let fixture: ComponentFixture<LogRoleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogRoleComponent]
    });
    fixture = TestBed.createComponent(LogRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
