import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogTwentyTwoComponent } from './home-ru-blog-twenty-two.component';

describe('HomeRuBlogTwentyTwoComponent', () => {
  let component: HomeRuBlogTwentyTwoComponent;
  let fixture: ComponentFixture<HomeRuBlogTwentyTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogTwentyTwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogTwentyTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
