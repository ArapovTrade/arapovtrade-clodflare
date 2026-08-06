import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogTwentyTwoComponent } from './home-uk-blog-twenty-two.component';

describe('HomeUkBlogTwentyTwoComponent', () => {
  let component: HomeUkBlogTwentyTwoComponent;
  let fixture: ComponentFixture<HomeUkBlogTwentyTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogTwentyTwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogTwentyTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
