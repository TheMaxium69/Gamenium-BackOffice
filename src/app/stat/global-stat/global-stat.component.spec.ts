import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalStatComponent } from './global-stat.component';

describe('GlobalStatComponent', () => {
  let component: GlobalStatComponent;
  let fixture: ComponentFixture<GlobalStatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GlobalStatComponent]
    });
    fixture = TestBed.createComponent(GlobalStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
