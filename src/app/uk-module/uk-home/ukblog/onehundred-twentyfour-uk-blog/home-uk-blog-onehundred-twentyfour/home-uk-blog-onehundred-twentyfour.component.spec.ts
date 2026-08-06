import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogOnehundredTwentyfourComponent } from './home-uk-blog-onehundred-twentyfour.component';

describe('HomeUkBlogOnehundredTwentyfourComponent', () => {
  let component: HomeUkBlogOnehundredTwentyfourComponent;
  let fixture: ComponentFixture<HomeUkBlogOnehundredTwentyfourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogOnehundredTwentyfourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogOnehundredTwentyfourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
