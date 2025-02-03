import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModoProfilComponent } from './modo-profil.component';

describe('ModoProfilComponent', () => {
  let component: ModoProfilComponent;
  let fixture: ComponentFixture<ModoProfilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModoProfilComponent]
    });
    fixture = TestBed.createComponent(ModoProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
