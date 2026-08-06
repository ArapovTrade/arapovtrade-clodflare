import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogTwelveComponent } from './home-uk-blog-twelve.component';

describe('HomeUkBlogTwelveComponent', () => {
  let component: HomeUkBlogTwelveComponent;
  let fixture: ComponentFixture<HomeUkBlogTwelveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogTwelveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogTwelveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
