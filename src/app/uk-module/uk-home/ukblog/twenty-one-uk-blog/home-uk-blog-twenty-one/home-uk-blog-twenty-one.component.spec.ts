import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogTwentyOneComponent } from './home-uk-blog-twenty-one.component';

describe('HomeUkBlogTwentyOneComponent', () => {
  let component: HomeUkBlogTwentyOneComponent;
  let fixture: ComponentFixture<HomeUkBlogTwentyOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogTwentyOneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogTwentyOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
