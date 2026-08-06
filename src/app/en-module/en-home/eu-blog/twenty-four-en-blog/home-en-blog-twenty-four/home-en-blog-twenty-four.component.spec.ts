import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogTwentyFourComponent } from './home-en-blog-twenty-four.component';

describe('HomeEnBlogTwentyFourComponent', () => {
  let component: HomeEnBlogTwentyFourComponent;
  let fixture: ComponentFixture<HomeEnBlogTwentyFourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogTwentyFourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogTwentyFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
