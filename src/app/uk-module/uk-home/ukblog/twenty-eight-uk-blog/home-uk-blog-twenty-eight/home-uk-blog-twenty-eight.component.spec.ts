import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogTwentyEightComponent } from './home-uk-blog-twenty-eight.component';

describe('HomeUkBlogTwentyEightComponent', () => {
  let component: HomeUkBlogTwentyEightComponent;
  let fixture: ComponentFixture<HomeUkBlogTwentyEightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogTwentyEightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogTwentyEightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
