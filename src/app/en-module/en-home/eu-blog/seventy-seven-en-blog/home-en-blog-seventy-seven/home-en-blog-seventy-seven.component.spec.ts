import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogSeventySevenComponent } from './home-en-blog-seventy-seven.component';

describe('HomeEnBlogSeventySevenComponent', () => {
  let component: HomeEnBlogSeventySevenComponent;
  let fixture: ComponentFixture<HomeEnBlogSeventySevenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogSeventySevenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogSeventySevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
