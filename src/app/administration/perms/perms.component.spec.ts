import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermsComponent } from './perms.component';

describe('PermsComponent', () => {
  let component: PermsComponent;
  let fixture: ComponentFixture<PermsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PermsComponent]
    });
    fixture = TestBed.createComponent(PermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
