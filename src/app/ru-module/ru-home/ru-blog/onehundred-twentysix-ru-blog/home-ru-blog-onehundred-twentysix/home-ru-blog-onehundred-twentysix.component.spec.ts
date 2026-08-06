import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogOnehundredTwentysixComponent } from './home-ru-blog-onehundred-twentysix.component';

describe('HomeRuBlogOnehundredTwentysixComponent', () => {
  let component: HomeRuBlogOnehundredTwentysixComponent;
  let fixture: ComponentFixture<HomeRuBlogOnehundredTwentysixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogOnehundredTwentysixComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogOnehundredTwentysixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
