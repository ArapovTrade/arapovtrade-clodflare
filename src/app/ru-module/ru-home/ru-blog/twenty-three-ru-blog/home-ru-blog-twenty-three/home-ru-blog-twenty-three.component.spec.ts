import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogTwentyThreeComponent } from './home-ru-blog-twenty-three.component';

describe('HomeRuBlogTwentyThreeComponent', () => {
  let component: HomeRuBlogTwentyThreeComponent;
  let fixture: ComponentFixture<HomeRuBlogTwentyThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogTwentyThreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogTwentyThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
