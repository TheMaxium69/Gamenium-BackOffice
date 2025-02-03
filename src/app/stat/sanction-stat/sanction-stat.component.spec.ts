import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SanctionStatComponent } from './sanction-stat.component';

describe('SanctionStatComponent', () => {
  let component: SanctionStatComponent;
  let fixture: ComponentFixture<SanctionStatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SanctionStatComponent]
    });
    fixture = TestBed.createComponent(SanctionStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
