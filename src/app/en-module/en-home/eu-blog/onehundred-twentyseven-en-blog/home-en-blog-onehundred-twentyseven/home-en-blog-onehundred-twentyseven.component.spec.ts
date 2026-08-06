import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogOnehundredTwentysevenComponent } from './home-en-blog-onehundred-twentyseven.component';

describe('HomeEnBlogOnehundredTwentysevenComponent', () => {
  let component: HomeEnBlogOnehundredTwentysevenComponent;
  let fixture: ComponentFixture<HomeEnBlogOnehundredTwentysevenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogOnehundredTwentysevenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogOnehundredTwentysevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
