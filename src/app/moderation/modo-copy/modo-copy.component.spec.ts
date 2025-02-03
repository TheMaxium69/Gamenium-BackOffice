import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModoCopyComponent } from './modo-copy.component';

describe('ModoCopyComponent', () => {
  let component: ModoCopyComponent;
  let fixture: ComponentFixture<ModoCopyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModoCopyComponent]
    });
    fixture = TestBed.createComponent(ModoCopyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
