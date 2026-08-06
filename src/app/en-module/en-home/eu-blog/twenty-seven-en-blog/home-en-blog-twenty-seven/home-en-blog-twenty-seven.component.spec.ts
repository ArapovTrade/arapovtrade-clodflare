import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogTwentySevenComponent } from './home-en-blog-twenty-seven.component';

describe('HomeEnBlogTwentySevenComponent', () => {
  let component: HomeEnBlogTwentySevenComponent;
  let fixture: ComponentFixture<HomeEnBlogTwentySevenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogTwentySevenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogTwentySevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
