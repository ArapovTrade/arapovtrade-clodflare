import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogOnehundredTwentyeightComponent } from './home-uk-blog-onehundred-twentyeight.component';

describe('HomeUkBlogOnehundredTwentyeightComponent', () => {
  let component: HomeUkBlogOnehundredTwentyeightComponent;
  let fixture: ComponentFixture<HomeUkBlogOnehundredTwentyeightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogOnehundredTwentyeightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogOnehundredTwentyeightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
