import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogSeventyOneComponent } from './home-uk-blog-seventy-one.component';

describe('HomeUkBlogSeventyOneComponent', () => {
  let component: HomeUkBlogSeventyOneComponent;
  let fixture: ComponentFixture<HomeUkBlogSeventyOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogSeventyOneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogSeventyOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
