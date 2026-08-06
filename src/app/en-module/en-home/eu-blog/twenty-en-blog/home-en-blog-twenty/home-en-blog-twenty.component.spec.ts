import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogTwentyComponent } from './home-en-blog-twenty.component';

describe('HomeEnBlogTwentyComponent', () => {
  let component: HomeEnBlogTwentyComponent;
  let fixture: ComponentFixture<HomeEnBlogTwentyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogTwentyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogTwentyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
