import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogSeventyComponent } from './home-ru-blog-seventy.component';

describe('HomeRuBlogSeventyComponent', () => {
  let component: HomeRuBlogSeventyComponent;
  let fixture: ComponentFixture<HomeRuBlogSeventyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogSeventyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogSeventyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
