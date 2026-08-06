import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogOnehundredSeventyComponent } from './home-ru-blog-onehundred-seventy.component';

describe('HomeRuBlogOnehundredSeventyComponent', () => {
  let component: HomeRuBlogOnehundredSeventyComponent;
  let fixture: ComponentFixture<HomeRuBlogOnehundredSeventyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogOnehundredSeventyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogOnehundredSeventyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
