import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogOnehundredTwelveComponent } from './home-en-blog-onehundred-twelve.component';

describe('HomeEnBlogOnehundredTwelveComponent', () => {
  let component: HomeEnBlogOnehundredTwelveComponent;
  let fixture: ComponentFixture<HomeEnBlogOnehundredTwelveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogOnehundredTwelveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogOnehundredTwelveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
