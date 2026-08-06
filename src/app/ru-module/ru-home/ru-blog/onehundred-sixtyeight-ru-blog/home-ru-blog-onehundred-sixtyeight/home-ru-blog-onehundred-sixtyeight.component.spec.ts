import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogOnehundredSixtyeightComponent } from './home-ru-blog-onehundred-sixtyeight.component';

describe('HomeRuBlogOnehundredSixtyeightComponent', () => {
  let component: HomeRuBlogOnehundredSixtyeightComponent;
  let fixture: ComponentFixture<HomeRuBlogOnehundredSixtyeightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogOnehundredSixtyeightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogOnehundredSixtyeightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
