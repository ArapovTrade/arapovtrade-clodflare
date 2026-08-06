import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogTwentyNineComponent } from './home-en-blog-twenty-nine.component';

describe('HomeEnBlogTwentyNineComponent', () => {
  let component: HomeEnBlogTwentyNineComponent;
  let fixture: ComponentFixture<HomeEnBlogTwentyNineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogTwentyNineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogTwentyNineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
