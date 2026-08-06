import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogOnehundredSixteenComponent } from './home-uk-blog-onehundred-sixteen.component';

describe('HomeUkBlogOnehundredSixteenComponent', () => {
  let component: HomeUkBlogOnehundredSixteenComponent;
  let fixture: ComponentFixture<HomeUkBlogOnehundredSixteenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogOnehundredSixteenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogOnehundredSixteenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
