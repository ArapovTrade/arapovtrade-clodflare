import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogSeventyFiveComponent } from './home-en-blog-seventy-five.component';

describe('HomeEnBlogSeventyFiveComponent', () => {
  let component: HomeEnBlogSeventyFiveComponent;
  let fixture: ComponentFixture<HomeEnBlogSeventyFiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogSeventyFiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogSeventyFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
