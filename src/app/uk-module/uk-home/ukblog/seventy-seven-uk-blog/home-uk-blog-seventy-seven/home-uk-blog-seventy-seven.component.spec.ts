import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogSeventySevenComponent } from './home-uk-blog-seventy-seven.component';

describe('HomeUkBlogSeventySevenComponent', () => {
  let component: HomeUkBlogSeventySevenComponent;
  let fixture: ComponentFixture<HomeUkBlogSeventySevenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogSeventySevenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogSeventySevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
