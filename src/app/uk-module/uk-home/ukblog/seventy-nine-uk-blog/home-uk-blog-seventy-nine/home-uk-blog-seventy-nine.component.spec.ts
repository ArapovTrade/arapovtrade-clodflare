import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogSeventyNineComponent } from './home-uk-blog-seventy-nine.component';

describe('HomeUkBlogSeventyNineComponent', () => {
  let component: HomeUkBlogSeventyNineComponent;
  let fixture: ComponentFixture<HomeUkBlogSeventyNineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogSeventyNineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogSeventyNineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
