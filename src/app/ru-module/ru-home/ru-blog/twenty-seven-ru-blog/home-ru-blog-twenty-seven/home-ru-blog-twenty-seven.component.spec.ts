import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogTwentySevenComponent } from './home-ru-blog-twenty-seven.component';

describe('HomeRuBlogTwentySevenComponent', () => {
  let component: HomeRuBlogTwentySevenComponent;
  let fixture: ComponentFixture<HomeRuBlogTwentySevenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogTwentySevenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogTwentySevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
