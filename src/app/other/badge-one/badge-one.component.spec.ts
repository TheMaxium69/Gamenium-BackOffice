import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BadgeOneComponent } from './badge-one.component';

describe('BadgeOneComponent', () => {
  let component: BadgeOneComponent;
  let fixture: ComponentFixture<BadgeOneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BadgeOneComponent]
    });
    fixture = TestBed.createComponent(BadgeOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
