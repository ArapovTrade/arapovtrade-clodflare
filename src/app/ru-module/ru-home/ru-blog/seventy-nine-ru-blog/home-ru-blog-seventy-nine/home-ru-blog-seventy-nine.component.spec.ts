import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogSeventyNineComponent } from './home-ru-blog-seventy-nine.component';

describe('HomeRuBlogSeventyNineComponent', () => {
  let component: HomeRuBlogSeventyNineComponent;
  let fixture: ComponentFixture<HomeRuBlogSeventyNineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogSeventyNineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogSeventyNineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
