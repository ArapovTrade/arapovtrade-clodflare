import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogSeventyOneComponent } from './home-en-blog-seventy-one.component';

describe('HomeEnBlogSeventyOneComponent', () => {
  let component: HomeEnBlogSeventyOneComponent;
  let fixture: ComponentFixture<HomeEnBlogSeventyOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogSeventyOneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogSeventyOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
