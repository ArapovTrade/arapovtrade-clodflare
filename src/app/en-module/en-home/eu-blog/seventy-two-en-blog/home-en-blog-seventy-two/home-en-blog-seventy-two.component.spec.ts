import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogSeventyTwoComponent } from './home-en-blog-seventy-two.component';

describe('HomeEnBlogSeventyTwoComponent', () => {
  let component: HomeEnBlogSeventyTwoComponent;
  let fixture: ComponentFixture<HomeEnBlogSeventyTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogSeventyTwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogSeventyTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
