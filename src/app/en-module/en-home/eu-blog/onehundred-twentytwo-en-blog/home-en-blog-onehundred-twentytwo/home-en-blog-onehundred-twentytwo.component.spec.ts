import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogOnehundredTwentytwoComponent } from './home-en-blog-onehundred-twentytwo.component';

describe('HomeEnBlogOnehundredTwentytwoComponent', () => {
  let component: HomeEnBlogOnehundredTwentytwoComponent;
  let fixture: ComponentFixture<HomeEnBlogOnehundredTwentytwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogOnehundredTwentytwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogOnehundredTwentytwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
