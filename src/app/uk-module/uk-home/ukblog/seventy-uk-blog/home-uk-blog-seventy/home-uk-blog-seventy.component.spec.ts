import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogSeventyComponent } from './home-uk-blog-seventy.component';

describe('HomeUkBlogSeventyComponent', () => {
  let component: HomeUkBlogSeventyComponent;
  let fixture: ComponentFixture<HomeUkBlogSeventyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogSeventyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogSeventyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
