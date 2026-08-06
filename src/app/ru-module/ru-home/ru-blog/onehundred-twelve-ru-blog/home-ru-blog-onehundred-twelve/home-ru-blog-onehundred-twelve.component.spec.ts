import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogOnehundredTwelveComponent } from './home-ru-blog-onehundred-twelve.component';

describe('HomeRuBlogOnehundredTwelveComponent', () => {
  let component: HomeRuBlogOnehundredTwelveComponent;
  let fixture: ComponentFixture<HomeRuBlogOnehundredTwelveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogOnehundredTwelveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogOnehundredTwelveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
