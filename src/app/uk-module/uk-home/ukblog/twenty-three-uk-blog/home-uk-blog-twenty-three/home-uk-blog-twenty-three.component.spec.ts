import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogTwentyThreeComponent } from './home-uk-blog-twenty-three.component';

describe('HomeUkBlogTwentyThreeComponent', () => {
  let component: HomeUkBlogTwentyThreeComponent;
  let fixture: ComponentFixture<HomeUkBlogTwentyThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogTwentyThreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogTwentyThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
