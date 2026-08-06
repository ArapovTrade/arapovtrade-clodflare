import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogOnehundredSeventyeightComponent } from './home-uk-blog-onehundred-seventyeight.component';

describe('HomeUkBlogOnehundredSeventyeightComponent', () => {
  let component: HomeUkBlogOnehundredSeventyeightComponent;
  let fixture: ComponentFixture<HomeUkBlogOnehundredSeventyeightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogOnehundredSeventyeightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogOnehundredSeventyeightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
