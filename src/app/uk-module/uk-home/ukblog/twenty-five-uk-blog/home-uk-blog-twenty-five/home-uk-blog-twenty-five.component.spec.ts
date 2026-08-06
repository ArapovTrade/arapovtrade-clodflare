import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogTwentyFiveComponent } from './home-uk-blog-twenty-five.component';

describe('HomeUkBlogTwentyFiveComponent', () => {
  let component: HomeUkBlogTwentyFiveComponent;
  let fixture: ComponentFixture<HomeUkBlogTwentyFiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogTwentyFiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogTwentyFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
