import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogTwentyFiveComponent } from './home-ru-blog-twenty-five.component';

describe('HomeRuBlogTwentyFiveComponent', () => {
  let component: HomeRuBlogTwentyFiveComponent;
  let fixture: ComponentFixture<HomeRuBlogTwentyFiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogTwentyFiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogTwentyFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
