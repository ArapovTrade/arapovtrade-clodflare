import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogSeventyOneComponent } from './home-ru-blog-seventy-one.component';

describe('HomeRuBlogSeventyOneComponent', () => {
  let component: HomeRuBlogSeventyOneComponent;
  let fixture: ComponentFixture<HomeRuBlogSeventyOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogSeventyOneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogSeventyOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
