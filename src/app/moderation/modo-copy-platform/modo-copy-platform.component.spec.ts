import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModoCopyPlatformComponent } from './modo-copy-platform.component';

describe('ModoCopyPlatformComponent', () => {
  let component: ModoCopyPlatformComponent;
  let fixture: ComponentFixture<ModoCopyPlatformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModoCopyPlatformComponent]
    });
    fixture = TestBed.createComponent(ModoCopyPlatformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
