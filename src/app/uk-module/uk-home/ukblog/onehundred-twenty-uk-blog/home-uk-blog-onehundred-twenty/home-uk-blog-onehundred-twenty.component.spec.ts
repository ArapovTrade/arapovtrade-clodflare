import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogOnehundredTwentyComponent } from './home-uk-blog-onehundred-twenty.component';

describe('HomeUkBlogOnehundredTwentyComponent', () => {
  let component: HomeUkBlogOnehundredTwentyComponent;
  let fixture: ComponentFixture<HomeUkBlogOnehundredTwentyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogOnehundredTwentyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogOnehundredTwentyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
