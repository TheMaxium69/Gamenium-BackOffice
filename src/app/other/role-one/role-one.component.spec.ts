import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleOneComponent } from './role-one.component';

describe('RoleOneComponent', () => {
  let component: RoleOneComponent;
  let fixture: ComponentFixture<RoleOneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoleOneComponent]
    });
    fixture = TestBed.createComponent(RoleOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
