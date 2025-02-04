import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderEditArticleComponent } from './provider-edit-article.component';

describe('ProviderEditArticleComponent', () => {
  let component: ProviderEditArticleComponent;
  let fixture: ComponentFixture<ProviderEditArticleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProviderEditArticleComponent]
    });
    fixture = TestBed.createComponent(ProviderEditArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
