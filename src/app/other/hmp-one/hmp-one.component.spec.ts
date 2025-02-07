import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HmpOneComponent } from './hmp-one.component';

describe('HmpOneComponent', () => {
  let component: HmpOneComponent;
  let fixture: ComponentFixture<HmpOneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HmpOneComponent]
    });
    fixture = TestBed.createComponent(HmpOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
