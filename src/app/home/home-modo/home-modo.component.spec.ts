import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeModoComponent } from './home-modo.component';

describe('HomeModoComponent', () => {
  let component: HomeModoComponent;
  let fixture: ComponentFixture<HomeModoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeModoComponent]
    });
    fixture = TestBed.createComponent(HomeModoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
