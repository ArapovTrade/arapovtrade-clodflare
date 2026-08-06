import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogTwentyFourComponent } from './home-uk-blog-twenty-four.component';

describe('HomeUkBlogTwentyFourComponent', () => {
  let component: HomeUkBlogTwentyFourComponent;
  let fixture: ComponentFixture<HomeUkBlogTwentyFourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogTwentyFourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogTwentyFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
