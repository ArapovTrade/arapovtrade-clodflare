import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogSeventySevenComponent } from './home-ru-blog-seventy-seven.component';

describe('HomeRuBlogSeventySevenComponent', () => {
  let component: HomeRuBlogSeventySevenComponent;
  let fixture: ComponentFixture<HomeRuBlogSeventySevenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogSeventySevenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogSeventySevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
