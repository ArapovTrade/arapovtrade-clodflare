import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogSeventyThreeComponent } from './home-en-blog-seventy-three.component';

describe('HomeEnBlogSeventyThreeComponent', () => {
  let component: HomeEnBlogSeventyThreeComponent;
  let fixture: ComponentFixture<HomeEnBlogSeventyThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogSeventyThreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogSeventyThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
