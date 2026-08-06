import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogTwentyThreeComponent } from './home-en-blog-twenty-three.component';

describe('HomeEnBlogTwentyThreeComponent', () => {
  let component: HomeEnBlogTwentyThreeComponent;
  let fixture: ComponentFixture<HomeEnBlogTwentyThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogTwentyThreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogTwentyThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
