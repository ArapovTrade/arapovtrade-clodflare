import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogOnehundredSixteenComponent } from './home-ru-blog-onehundred-sixteen.component';

describe('HomeRuBlogOnehundredSixteenComponent', () => {
  let component: HomeRuBlogOnehundredSixteenComponent;
  let fixture: ComponentFixture<HomeRuBlogOnehundredSixteenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogOnehundredSixteenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogOnehundredSixteenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
