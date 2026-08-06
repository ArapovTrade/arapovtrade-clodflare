import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogOnehundredTwentyeightComponent } from './home-ru-blog-onehundred-twentyeight.component';

describe('HomeRuBlogOnehundredTwentyeightComponent', () => {
  let component: HomeRuBlogOnehundredTwentyeightComponent;
  let fixture: ComponentFixture<HomeRuBlogOnehundredTwentyeightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogOnehundredTwentyeightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogOnehundredTwentyeightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
