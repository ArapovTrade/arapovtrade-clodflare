import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogOnehundredSeventyeightComponent } from './home-ru-blog-onehundred-seventyeight.component';

describe('HomeRuBlogOnehundredSeventyeightComponent', () => {
  let component: HomeRuBlogOnehundredSeventyeightComponent;
  let fixture: ComponentFixture<HomeRuBlogOnehundredSeventyeightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogOnehundredSeventyeightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogOnehundredSeventyeightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
