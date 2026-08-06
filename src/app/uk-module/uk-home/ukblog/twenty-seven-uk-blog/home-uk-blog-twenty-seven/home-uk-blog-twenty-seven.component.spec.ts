import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogTwentySevenComponent } from './home-uk-blog-twenty-seven.component';

describe('HomeUkBlogTwentySevenComponent', () => {
  let component: HomeUkBlogTwentySevenComponent;
  let fixture: ComponentFixture<HomeUkBlogTwentySevenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogTwentySevenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogTwentySevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
