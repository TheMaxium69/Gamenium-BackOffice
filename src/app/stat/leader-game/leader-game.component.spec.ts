import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderGameComponent } from './leader-game.component';

describe('LeaderGameComponent', () => {
  let component: LeaderGameComponent;
  let fixture: ComponentFixture<LeaderGameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeaderGameComponent]
    });
    fixture = TestBed.createComponent(LeaderGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
