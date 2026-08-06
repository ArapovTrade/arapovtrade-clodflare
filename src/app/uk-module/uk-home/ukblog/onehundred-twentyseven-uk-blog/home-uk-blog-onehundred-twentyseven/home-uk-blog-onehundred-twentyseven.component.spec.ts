import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogOnehundredTwentysevenComponent } from './home-uk-blog-onehundred-twentyseven.component';

describe('HomeUkBlogOnehundredTwentysevenComponent', () => {
  let component: HomeUkBlogOnehundredTwentysevenComponent;
  let fixture: ComponentFixture<HomeUkBlogOnehundredTwentysevenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogOnehundredTwentysevenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogOnehundredTwentysevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
