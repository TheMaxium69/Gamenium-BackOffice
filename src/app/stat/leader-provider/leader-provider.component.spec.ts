import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderProviderComponent } from './leader-provider.component';

describe('LeaderProviderComponent', () => {
  let component: LeaderProviderComponent;
  let fixture: ComponentFixture<LeaderProviderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeaderProviderComponent]
    });
    fixture = TestBed.createComponent(LeaderProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
