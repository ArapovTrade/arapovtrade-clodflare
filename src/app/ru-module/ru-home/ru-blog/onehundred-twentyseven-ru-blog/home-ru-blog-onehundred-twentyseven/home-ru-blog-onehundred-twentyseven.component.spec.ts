import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogOnehundredTwentysevenComponent } from './home-ru-blog-onehundred-twentyseven.component';

describe('HomeRuBlogOnehundredTwentysevenComponent', () => {
  let component: HomeRuBlogOnehundredTwentysevenComponent;
  let fixture: ComponentFixture<HomeRuBlogOnehundredTwentysevenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogOnehundredTwentysevenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogOnehundredTwentysevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
