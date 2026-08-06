import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogTwentyEightComponent } from './home-ru-blog-twenty-eight.component';

describe('HomeRuBlogTwentyEightComponent', () => {
  let component: HomeRuBlogTwentyEightComponent;
  let fixture: ComponentFixture<HomeRuBlogTwentyEightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogTwentyEightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogTwentyEightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
