import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogOnehundredSeventyeightComponent } from './home-en-blog-onehundred-seventyeight.component';

describe('HomeEnBlogOnehundredSeventyeightComponent', () => {
  let component: HomeEnBlogOnehundredSeventyeightComponent;
  let fixture: ComponentFixture<HomeEnBlogOnehundredSeventyeightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogOnehundredSeventyeightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogOnehundredSeventyeightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
