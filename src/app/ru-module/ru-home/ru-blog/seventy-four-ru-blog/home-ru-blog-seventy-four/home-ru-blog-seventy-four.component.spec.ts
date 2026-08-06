import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogSeventyFourComponent } from './home-ru-blog-seventy-four.component';

describe('HomeRuBlogSeventyFourComponent', () => {
  let component: HomeRuBlogSeventyFourComponent;
  let fixture: ComponentFixture<HomeRuBlogSeventyFourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogSeventyFourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogSeventyFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
