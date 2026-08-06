import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogTwentyComponent } from './home-ru-blog-twenty.component';

describe('HomeRuBlogTwentyComponent', () => {
  let component: HomeRuBlogTwentyComponent;
  let fixture: ComponentFixture<HomeRuBlogTwentyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogTwentyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogTwentyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
