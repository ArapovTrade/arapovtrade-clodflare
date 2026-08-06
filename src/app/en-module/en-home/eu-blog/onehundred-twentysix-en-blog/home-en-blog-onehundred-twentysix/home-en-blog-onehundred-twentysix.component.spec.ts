import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogOnehundredTwentysixComponent } from './home-en-blog-onehundred-twentysix.component';

describe('HomeEnBlogOnehundredTwentysixComponent', () => {
  let component: HomeEnBlogOnehundredTwentysixComponent;
  let fixture: ComponentFixture<HomeEnBlogOnehundredTwentysixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogOnehundredTwentysixComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogOnehundredTwentysixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
