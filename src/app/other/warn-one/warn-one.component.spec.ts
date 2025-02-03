import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarnOneComponent } from './warn-one.component';

describe('WarnOneComponent', () => {
  let component: WarnOneComponent;
  let fixture: ComponentFixture<WarnOneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WarnOneComponent]
    });
    fixture = TestBed.createComponent(WarnOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
