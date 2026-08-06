import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogSeventyEightComponent } from './home-ru-blog-seventy-eight.component';

describe('HomeRuBlogSeventyEightComponent', () => {
  let component: HomeRuBlogSeventyEightComponent;
  let fixture: ComponentFixture<HomeRuBlogSeventyEightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogSeventyEightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogSeventyEightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
