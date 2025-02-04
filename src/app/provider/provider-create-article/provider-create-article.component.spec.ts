import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderCreateArticleComponent } from './provider-create-article.component';

describe('ProviderCreateArticleComponent', () => {
  let component: ProviderCreateArticleComponent;
  let fixture: ComponentFixture<ProviderCreateArticleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProviderCreateArticleComponent]
    });
    fixture = TestBed.createComponent(ProviderCreateArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
