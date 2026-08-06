import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogOnehundredSeventyComponent } from './home-en-blog-onehundred-seventy.component';

describe('HomeEnBlogOnehundredSeventyComponent', () => {
  let component: HomeEnBlogOnehundredSeventyComponent;
  let fixture: ComponentFixture<HomeEnBlogOnehundredSeventyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogOnehundredSeventyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogOnehundredSeventyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
