import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogOnehundredTwentyeightComponent } from './home-en-blog-onehundred-twentyeight.component';

describe('HomeEnBlogOnehundredTwentyeightComponent', () => {
  let component: HomeEnBlogOnehundredTwentyeightComponent;
  let fixture: ComponentFixture<HomeEnBlogOnehundredTwentyeightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogOnehundredTwentyeightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogOnehundredTwentyeightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
