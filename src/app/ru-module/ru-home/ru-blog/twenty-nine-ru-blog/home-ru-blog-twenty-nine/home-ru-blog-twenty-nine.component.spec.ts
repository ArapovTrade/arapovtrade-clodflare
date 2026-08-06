import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogTwentyNineComponent } from './home-ru-blog-twenty-nine.component';

describe('HomeRuBlogTwentyNineComponent', () => {
  let component: HomeRuBlogTwentyNineComponent;
  let fixture: ComponentFixture<HomeRuBlogTwentyNineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogTwentyNineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogTwentyNineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
