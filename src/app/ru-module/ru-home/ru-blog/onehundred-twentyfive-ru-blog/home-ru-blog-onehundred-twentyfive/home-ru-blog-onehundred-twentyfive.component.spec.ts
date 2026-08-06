import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogOnehundredTwentyfiveComponent } from './home-ru-blog-onehundred-twentyfive.component';

describe('HomeRuBlogOnehundredTwentyfiveComponent', () => {
  let component: HomeRuBlogOnehundredTwentyfiveComponent;
  let fixture: ComponentFixture<HomeRuBlogOnehundredTwentyfiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogOnehundredTwentyfiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogOnehundredTwentyfiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
