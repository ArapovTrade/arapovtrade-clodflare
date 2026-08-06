import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogTwentyOneComponent } from './home-ru-blog-twenty-one.component';

describe('HomeRuBlogTwentyOneComponent', () => {
  let component: HomeRuBlogTwentyOneComponent;
  let fixture: ComponentFixture<HomeRuBlogTwentyOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogTwentyOneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogTwentyOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
