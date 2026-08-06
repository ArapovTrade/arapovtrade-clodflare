import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogSeventyComponent } from './home-en-blog-seventy.component';

describe('HomeEnBlogSeventyComponent', () => {
  let component: HomeEnBlogSeventyComponent;
  let fixture: ComponentFixture<HomeEnBlogSeventyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogSeventyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogSeventyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
