import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogOnehundredTwentytwoComponent } from './home-uk-blog-onehundred-twentytwo.component';

describe('HomeUkBlogOnehundredTwentytwoComponent', () => {
  let component: HomeUkBlogOnehundredTwentytwoComponent;
  let fixture: ComponentFixture<HomeUkBlogOnehundredTwentytwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogOnehundredTwentytwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogOnehundredTwentytwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
