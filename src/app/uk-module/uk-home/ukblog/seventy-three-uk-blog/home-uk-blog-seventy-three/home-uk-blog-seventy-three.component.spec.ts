import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogSeventyThreeComponent } from './home-uk-blog-seventy-three.component';

describe('HomeUkBlogSeventyThreeComponent', () => {
  let component: HomeUkBlogSeventyThreeComponent;
  let fixture: ComponentFixture<HomeUkBlogSeventyThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogSeventyThreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogSeventyThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
