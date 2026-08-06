import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogTwentyComponent } from './home-uk-blog-twenty.component';

describe('HomeUkBlogTwentyComponent', () => {
  let component: HomeUkBlogTwentyComponent;
  let fixture: ComponentFixture<HomeUkBlogTwentyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogTwentyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogTwentyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
