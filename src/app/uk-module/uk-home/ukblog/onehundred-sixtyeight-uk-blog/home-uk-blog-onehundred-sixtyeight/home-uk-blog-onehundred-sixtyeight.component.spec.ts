import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogOnehundredSixtyeightComponent } from './home-uk-blog-onehundred-sixtyeight.component';

describe('HomeUkBlogOnehundredSixtyeightComponent', () => {
  let component: HomeUkBlogOnehundredSixtyeightComponent;
  let fixture: ComponentFixture<HomeUkBlogOnehundredSixtyeightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogOnehundredSixtyeightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogOnehundredSixtyeightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
