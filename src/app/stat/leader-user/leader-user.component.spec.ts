import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderUserComponent } from './leader-user.component';

describe('LeaderUserComponent', () => {
  let component: LeaderUserComponent;
  let fixture: ComponentFixture<LeaderUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeaderUserComponent]
    });
    fixture = TestBed.createComponent(LeaderUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
