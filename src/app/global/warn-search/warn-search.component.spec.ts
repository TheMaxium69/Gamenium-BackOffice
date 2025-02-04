import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarnSearchComponent } from './warn-search.component';

describe('WarnSearchComponent', () => {
  let component: WarnSearchComponent;
  let fixture: ComponentFixture<WarnSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WarnSearchComponent]
    });
    fixture = TestBed.createComponent(WarnSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
