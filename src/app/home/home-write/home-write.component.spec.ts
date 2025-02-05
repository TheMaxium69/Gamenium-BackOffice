import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeWriteComponent } from './home-write.component';

describe('HomeWriteComponent', () => {
  let component: HomeWriteComponent;
  let fixture: ComponentFixture<HomeWriteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeWriteComponent]
    });
    fixture = TestBed.createComponent(HomeWriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
