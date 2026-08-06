import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogSeventyEightComponent } from './home-en-blog-seventy-eight.component';

describe('HomeEnBlogSeventyEightComponent', () => {
  let component: HomeEnBlogSeventyEightComponent;
  let fixture: ComponentFixture<HomeEnBlogSeventyEightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogSeventyEightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogSeventyEightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
