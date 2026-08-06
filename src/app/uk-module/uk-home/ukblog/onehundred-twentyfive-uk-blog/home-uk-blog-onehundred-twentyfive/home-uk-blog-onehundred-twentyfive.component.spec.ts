import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogOnehundredTwentyfiveComponent } from './home-uk-blog-onehundred-twentyfive.component';

describe('HomeUkBlogOnehundredTwentyfiveComponent', () => {
  let component: HomeUkBlogOnehundredTwentyfiveComponent;
  let fixture: ComponentFixture<HomeUkBlogOnehundredTwentyfiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogOnehundredTwentyfiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogOnehundredTwentyfiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
