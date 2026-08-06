import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogOnehundredThirtysevenComponent } from './home-ru-blog-onehundred-thirtyseven.component';

describe('HomeRuBlogOnehundredThirtysevenComponent', () => {
  let component: HomeRuBlogOnehundredThirtysevenComponent;
  let fixture: ComponentFixture<HomeRuBlogOnehundredThirtysevenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogOnehundredThirtysevenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogOnehundredThirtysevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
