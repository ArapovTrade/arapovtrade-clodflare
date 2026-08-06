import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogTwentyTwoComponent } from './home-en-blog-twenty-two.component';

describe('HomeEnBlogTwentyTwoComponent', () => {
  let component: HomeEnBlogTwentyTwoComponent;
  let fixture: ComponentFixture<HomeEnBlogTwentyTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogTwentyTwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogTwentyTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
