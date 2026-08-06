import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogSeventyThreeComponent } from './home-ru-blog-seventy-three.component';

describe('HomeRuBlogSeventyThreeComponent', () => {
  let component: HomeRuBlogSeventyThreeComponent;
  let fixture: ComponentFixture<HomeRuBlogSeventyThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogSeventyThreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogSeventyThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
