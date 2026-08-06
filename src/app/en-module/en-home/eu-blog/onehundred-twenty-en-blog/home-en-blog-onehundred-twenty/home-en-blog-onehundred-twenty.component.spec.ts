import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogOnehundredTwentyComponent } from './home-en-blog-onehundred-twenty.component';

describe('HomeEnBlogOnehundredTwentyComponent', () => {
  let component: HomeEnBlogOnehundredTwentyComponent;
  let fixture: ComponentFixture<HomeEnBlogOnehundredTwentyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogOnehundredTwentyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogOnehundredTwentyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
