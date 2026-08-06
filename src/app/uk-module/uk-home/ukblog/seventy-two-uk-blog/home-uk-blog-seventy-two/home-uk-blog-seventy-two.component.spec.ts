import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogSeventyTwoComponent } from './home-uk-blog-seventy-two.component';

describe('HomeUkBlogSeventyTwoComponent', () => {
  let component: HomeUkBlogSeventyTwoComponent;
  let fixture: ComponentFixture<HomeUkBlogSeventyTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogSeventyTwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogSeventyTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
