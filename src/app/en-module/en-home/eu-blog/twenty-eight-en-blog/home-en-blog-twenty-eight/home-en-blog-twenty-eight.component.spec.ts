import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogTwentyEightComponent } from './home-en-blog-twenty-eight.component';

describe('HomeEnBlogTwentyEightComponent', () => {
  let component: HomeEnBlogTwentyEightComponent;
  let fixture: ComponentFixture<HomeEnBlogTwentyEightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogTwentyEightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogTwentyEightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
