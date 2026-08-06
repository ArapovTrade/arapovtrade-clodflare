import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogOnehundredTwentyoneComponent } from './home-ru-blog-onehundred-twentyone.component';

describe('HomeRuBlogOnehundredTwentyoneComponent', () => {
  let component: HomeRuBlogOnehundredTwentyoneComponent;
  let fixture: ComponentFixture<HomeRuBlogOnehundredTwentyoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogOnehundredTwentyoneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogOnehundredTwentyoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
