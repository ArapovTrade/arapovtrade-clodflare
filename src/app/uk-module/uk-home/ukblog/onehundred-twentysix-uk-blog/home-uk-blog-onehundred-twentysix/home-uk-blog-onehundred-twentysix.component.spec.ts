import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogOnehundredTwentysixComponent } from './home-uk-blog-onehundred-twentysix.component';

describe('HomeUkBlogOnehundredTwentysixComponent', () => {
  let component: HomeUkBlogOnehundredTwentysixComponent;
  let fixture: ComponentFixture<HomeUkBlogOnehundredTwentysixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogOnehundredTwentysixComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogOnehundredTwentysixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
