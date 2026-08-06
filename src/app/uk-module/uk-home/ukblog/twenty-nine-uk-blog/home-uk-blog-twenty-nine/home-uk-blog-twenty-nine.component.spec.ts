import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogTwentyNineComponent } from './home-uk-blog-twenty-nine.component';

describe('HomeUkBlogTwentyNineComponent', () => {
  let component: HomeUkBlogTwentyNineComponent;
  let fixture: ComponentFixture<HomeUkBlogTwentyNineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogTwentyNineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogTwentyNineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
