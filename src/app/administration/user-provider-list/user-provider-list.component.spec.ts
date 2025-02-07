import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProviderListComponent } from './user-provider-list.component';

describe('UserProviderListComponent', () => {
  let component: UserProviderListComponent;
  let fixture: ComponentFixture<UserProviderListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserProviderListComponent]
    });
    fixture = TestBed.createComponent(UserProviderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
