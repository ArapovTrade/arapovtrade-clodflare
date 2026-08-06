import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogSeventyFourComponent } from './home-en-blog-seventy-four.component';

describe('HomeEnBlogSeventyFourComponent', () => {
  let component: HomeEnBlogSeventyFourComponent;
  let fixture: ComponentFixture<HomeEnBlogSeventyFourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogSeventyFourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogSeventyFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
