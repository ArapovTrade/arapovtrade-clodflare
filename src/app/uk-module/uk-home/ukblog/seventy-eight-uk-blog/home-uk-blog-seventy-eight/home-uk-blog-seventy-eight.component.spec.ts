import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogSeventyEightComponent } from './home-uk-blog-seventy-eight.component';

describe('HomeUkBlogSeventyEightComponent', () => {
  let component: HomeUkBlogSeventyEightComponent;
  let fixture: ComponentFixture<HomeUkBlogSeventyEightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogSeventyEightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogSeventyEightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
