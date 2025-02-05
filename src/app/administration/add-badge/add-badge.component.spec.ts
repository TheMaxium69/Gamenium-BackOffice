import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBadgeComponent } from './add-badge.component';

describe('AddBadgeComponent', () => {
  let component: AddBadgeComponent;
  let fixture: ComponentFixture<AddBadgeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddBadgeComponent]
    });
    fixture = TestBed.createComponent(AddBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
