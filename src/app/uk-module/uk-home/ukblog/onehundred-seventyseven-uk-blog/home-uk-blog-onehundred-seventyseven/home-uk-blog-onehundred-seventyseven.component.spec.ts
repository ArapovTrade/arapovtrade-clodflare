import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogOnehundredSeventysevenComponent } from './home-uk-blog-onehundred-seventyseven.component';

describe('HomeUkBlogOnehundredSeventysevenComponent', () => {
  let component: HomeUkBlogOnehundredSeventysevenComponent;
  let fixture: ComponentFixture<HomeUkBlogOnehundredSeventysevenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogOnehundredSeventysevenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogOnehundredSeventysevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
