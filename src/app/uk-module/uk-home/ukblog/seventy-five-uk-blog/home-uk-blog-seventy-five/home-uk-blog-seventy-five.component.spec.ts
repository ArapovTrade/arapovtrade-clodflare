import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogSeventyFiveComponent } from './home-uk-blog-seventy-five.component';

describe('HomeUkBlogSeventyFiveComponent', () => {
  let component: HomeUkBlogSeventyFiveComponent;
  let fixture: ComponentFixture<HomeUkBlogSeventyFiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogSeventyFiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogSeventyFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
