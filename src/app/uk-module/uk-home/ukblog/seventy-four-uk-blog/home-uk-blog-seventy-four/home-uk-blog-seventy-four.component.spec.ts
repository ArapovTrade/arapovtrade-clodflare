import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogSeventyFourComponent } from './home-uk-blog-seventy-four.component';

describe('HomeUkBlogSeventyFourComponent', () => {
  let component: HomeUkBlogSeventyFourComponent;
  let fixture: ComponentFixture<HomeUkBlogSeventyFourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogSeventyFourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogSeventyFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
