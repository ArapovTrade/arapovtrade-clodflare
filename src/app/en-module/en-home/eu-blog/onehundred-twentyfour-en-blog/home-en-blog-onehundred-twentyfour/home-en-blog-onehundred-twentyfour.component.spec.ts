import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogOnehundredTwentyfourComponent } from './home-en-blog-onehundred-twentyfour.component';

describe('HomeEnBlogOnehundredTwentyfourComponent', () => {
  let component: HomeEnBlogOnehundredTwentyfourComponent;
  let fixture: ComponentFixture<HomeEnBlogOnehundredTwentyfourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogOnehundredTwentyfourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogOnehundredTwentyfourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
