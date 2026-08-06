import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnBlogHomepageComponent } from './en-blog-homepage.component';

describe('EnBlogHomepageComponent', () => {
  let component: EnBlogHomepageComponent;
  let fixture: ComponentFixture<EnBlogHomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EnBlogHomepageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnBlogHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
