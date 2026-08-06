import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogOnehundredTwentyoneComponent } from './home-en-blog-onehundred-twentyone.component';

describe('HomeEnBlogOnehundredTwentyoneComponent', () => {
  let component: HomeEnBlogOnehundredTwentyoneComponent;
  let fixture: ComponentFixture<HomeEnBlogOnehundredTwentyoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogOnehundredTwentyoneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogOnehundredTwentyoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
