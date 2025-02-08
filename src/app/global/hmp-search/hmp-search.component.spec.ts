import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HmpSearchComponent } from './hmp-search.component';

describe('HmpSearchComponent', () => {
  let component: HmpSearchComponent;
  let fixture: ComponentFixture<HmpSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HmpSearchComponent]
    });
    fixture = TestBed.createComponent(HmpSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
