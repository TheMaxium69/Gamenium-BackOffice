import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HmgOneComponent } from './hmg-one.component';

describe('HmgOneComponent', () => {
  let component: HmgOneComponent;
  let fixture: ComponentFixture<HmgOneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HmgOneComponent]
    });
    fixture = TestBed.createComponent(HmgOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
