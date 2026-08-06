import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogOnehundredTwentyoneComponent } from './home-uk-blog-onehundred-twentyone.component';

describe('HomeUkBlogOnehundredTwentyoneComponent', () => {
  let component: HomeUkBlogOnehundredTwentyoneComponent;
  let fixture: ComponentFixture<HomeUkBlogOnehundredTwentyoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogOnehundredTwentyoneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogOnehundredTwentyoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
