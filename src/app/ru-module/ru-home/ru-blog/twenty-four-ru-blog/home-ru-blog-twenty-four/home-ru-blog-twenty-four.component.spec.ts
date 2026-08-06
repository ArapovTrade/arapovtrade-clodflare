import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogTwentyFourComponent } from './home-ru-blog-twenty-four.component';

describe('HomeRuBlogTwentyFourComponent', () => {
  let component: HomeRuBlogTwentyFourComponent;
  let fixture: ComponentFixture<HomeRuBlogTwentyFourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogTwentyFourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogTwentyFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
