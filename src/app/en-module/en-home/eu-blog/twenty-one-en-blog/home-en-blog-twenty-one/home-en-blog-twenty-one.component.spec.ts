import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogTwentyOneComponent } from './home-en-blog-twenty-one.component';

describe('HomeEnBlogTwentyOneComponent', () => {
  let component: HomeEnBlogTwentyOneComponent;
  let fixture: ComponentFixture<HomeEnBlogTwentyOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogTwentyOneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogTwentyOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
