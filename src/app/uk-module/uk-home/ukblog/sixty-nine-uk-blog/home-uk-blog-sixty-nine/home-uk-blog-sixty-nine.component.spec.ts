import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogSixtyNineComponent } from './home-uk-blog-sixty-nine.component';

describe('HomeUkBlogSixtyNineComponent', () => {
  let component: HomeUkBlogSixtyNineComponent;
  let fixture: ComponentFixture<HomeUkBlogSixtyNineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogSixtyNineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogSixtyNineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
