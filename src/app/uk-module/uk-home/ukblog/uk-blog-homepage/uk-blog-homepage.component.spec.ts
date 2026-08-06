import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UkBlogHomepageComponent } from './uk-blog-homepage.component';

describe('UkBlogHomepageComponent', () => {
  let component: UkBlogHomepageComponent;
  let fixture: ComponentFixture<UkBlogHomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UkBlogHomepageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UkBlogHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
