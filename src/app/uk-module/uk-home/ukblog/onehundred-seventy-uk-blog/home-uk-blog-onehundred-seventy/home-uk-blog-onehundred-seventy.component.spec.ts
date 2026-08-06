import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogOnehundredSeventyComponent } from './home-uk-blog-onehundred-seventy.component';

describe('HomeUkBlogOnehundredSeventyComponent', () => {
  let component: HomeUkBlogOnehundredSeventyComponent;
  let fixture: ComponentFixture<HomeUkBlogOnehundredSeventyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogOnehundredSeventyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogOnehundredSeventyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
