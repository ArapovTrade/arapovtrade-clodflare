import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogSeventyNineComponent } from './home-en-blog-seventy-nine.component';

describe('HomeEnBlogSeventyNineComponent', () => {
  let component: HomeEnBlogSeventyNineComponent;
  let fixture: ComponentFixture<HomeEnBlogSeventyNineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogSeventyNineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogSeventyNineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
