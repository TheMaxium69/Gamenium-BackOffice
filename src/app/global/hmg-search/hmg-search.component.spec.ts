import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HmgSearchComponent } from './hmg-search.component';

describe('HmgSearchComponent', () => {
  let component: HmgSearchComponent;
  let fixture: ComponentFixture<HmgSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HmgSearchComponent]
    });
    fixture = TestBed.createComponent(HmgSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
