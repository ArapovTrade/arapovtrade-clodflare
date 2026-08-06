import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogOnehundredTwentyfourComponent } from './home-ru-blog-onehundred-twentyfour.component';

describe('HomeRuBlogOnehundredTwentyfourComponent', () => {
  let component: HomeRuBlogOnehundredTwentyfourComponent;
  let fixture: ComponentFixture<HomeRuBlogOnehundredTwentyfourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogOnehundredTwentyfourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogOnehundredTwentyfourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
