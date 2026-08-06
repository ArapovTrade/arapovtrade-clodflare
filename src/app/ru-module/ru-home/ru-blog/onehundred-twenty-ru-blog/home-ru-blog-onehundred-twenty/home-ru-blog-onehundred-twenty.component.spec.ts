import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogOnehundredTwentyComponent } from './home-ru-blog-onehundred-twenty.component';

describe('HomeRuBlogOnehundredTwentyComponent', () => {
  let component: HomeRuBlogOnehundredTwentyComponent;
  let fixture: ComponentFixture<HomeRuBlogOnehundredTwentyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogOnehundredTwentyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogOnehundredTwentyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
