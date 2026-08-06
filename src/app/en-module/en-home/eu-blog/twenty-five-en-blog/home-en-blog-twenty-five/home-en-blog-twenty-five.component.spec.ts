import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogTwentyFiveComponent } from './home-en-blog-twenty-five.component';

describe('HomeEnBlogTwentyFiveComponent', () => {
  let component: HomeEnBlogTwentyFiveComponent;
  let fixture: ComponentFixture<HomeEnBlogTwentyFiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogTwentyFiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogTwentyFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
