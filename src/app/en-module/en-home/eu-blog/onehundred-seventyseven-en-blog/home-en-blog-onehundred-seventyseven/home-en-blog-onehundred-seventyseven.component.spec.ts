import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogOnehundredSeventysevenComponent } from './home-en-blog-onehundred-seventyseven.component';

describe('HomeEnBlogOnehundredSeventysevenComponent', () => {
  let component: HomeEnBlogOnehundredSeventysevenComponent;
  let fixture: ComponentFixture<HomeEnBlogOnehundredSeventysevenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogOnehundredSeventysevenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogOnehundredSeventysevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
