import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogOnehundredTwelveComponent } from './home-uk-blog-onehundred-twelve.component';

describe('HomeUkBlogOnehundredTwelveComponent', () => {
  let component: HomeUkBlogOnehundredTwelveComponent;
  let fixture: ComponentFixture<HomeUkBlogOnehundredTwelveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogOnehundredTwelveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogOnehundredTwelveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
