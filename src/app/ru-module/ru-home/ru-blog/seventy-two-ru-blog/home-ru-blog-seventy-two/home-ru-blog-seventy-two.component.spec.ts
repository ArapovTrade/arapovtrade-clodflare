import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogSeventyTwoComponent } from './home-ru-blog-seventy-two.component';

describe('HomeRuBlogSeventyTwoComponent', () => {
  let component: HomeRuBlogSeventyTwoComponent;
  let fixture: ComponentFixture<HomeRuBlogSeventyTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogSeventyTwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogSeventyTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
