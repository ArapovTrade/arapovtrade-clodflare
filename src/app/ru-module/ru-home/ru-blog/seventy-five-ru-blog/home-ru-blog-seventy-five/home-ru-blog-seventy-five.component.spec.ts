import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogSeventyFiveComponent } from './home-ru-blog-seventy-five.component';

describe('HomeRuBlogSeventyFiveComponent', () => {
  let component: HomeRuBlogSeventyFiveComponent;
  let fixture: ComponentFixture<HomeRuBlogSeventyFiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogSeventyFiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogSeventyFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
