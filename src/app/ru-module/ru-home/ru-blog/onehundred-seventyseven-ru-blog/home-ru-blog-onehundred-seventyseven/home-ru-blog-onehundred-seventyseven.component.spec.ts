import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogOnehundredSeventysevenComponent } from './home-ru-blog-onehundred-seventyseven.component';

describe('HomeRuBlogOnehundredSeventysevenComponent', () => {
  let component: HomeRuBlogOnehundredSeventysevenComponent;
  let fixture: ComponentFixture<HomeRuBlogOnehundredSeventysevenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogOnehundredSeventysevenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogOnehundredSeventysevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
