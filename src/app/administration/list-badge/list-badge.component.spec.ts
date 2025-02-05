import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBadgeComponent } from './list-badge.component';

describe('ListBadgeComponent', () => {
  let component: ListBadgeComponent;
  let fixture: ComponentFixture<ListBadgeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListBadgeComponent]
    });
    fixture = TestBed.createComponent(ListBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
