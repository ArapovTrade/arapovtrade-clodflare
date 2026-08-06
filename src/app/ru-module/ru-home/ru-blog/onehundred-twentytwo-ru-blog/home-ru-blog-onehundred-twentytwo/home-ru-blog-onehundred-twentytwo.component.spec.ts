import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogOnehundredTwentytwoComponent } from './home-ru-blog-onehundred-twentytwo.component';

describe('HomeRuBlogOnehundredTwentytwoComponent', () => {
  let component: HomeRuBlogOnehundredTwentytwoComponent;
  let fixture: ComponentFixture<HomeRuBlogOnehundredTwentytwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogOnehundredTwentytwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogOnehundredTwentytwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
