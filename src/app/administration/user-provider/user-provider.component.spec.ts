import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProviderComponent } from './user-provider.component';

describe('UserProviderComponent', () => {
  let component: UserProviderComponent;
  let fixture: ComponentFixture<UserProviderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserProviderComponent]
    });
    fixture = TestBed.createComponent(UserProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
