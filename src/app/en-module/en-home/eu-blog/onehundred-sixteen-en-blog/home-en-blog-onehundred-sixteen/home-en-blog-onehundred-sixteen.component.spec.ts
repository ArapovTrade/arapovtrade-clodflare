import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogOnehundredSixteenComponent } from './home-en-blog-onehundred-sixteen.component';

describe('HomeEnBlogOnehundredSixteenComponent', () => {
  let component: HomeEnBlogOnehundredSixteenComponent;
  let fixture: ComponentFixture<HomeEnBlogOnehundredSixteenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogOnehundredSixteenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogOnehundredSixteenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
