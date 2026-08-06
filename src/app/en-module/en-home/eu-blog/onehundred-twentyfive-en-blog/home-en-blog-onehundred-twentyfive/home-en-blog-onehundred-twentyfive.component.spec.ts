import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogOnehundredTwentyfiveComponent } from './home-en-blog-onehundred-twentyfive.component';

describe('HomeEnBlogOnehundredTwentyfiveComponent', () => {
  let component: HomeEnBlogOnehundredTwentyfiveComponent;
  let fixture: ComponentFixture<HomeEnBlogOnehundredTwentyfiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogOnehundredTwentyfiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogOnehundredTwentyfiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
