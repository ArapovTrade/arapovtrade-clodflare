import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogOnehundredThirtysevenComponent } from './home-uk-blog-onehundred-thirtyseven.component';

describe('HomeUkBlogOnehundredThirtysevenComponent', () => {
  let component: HomeUkBlogOnehundredThirtysevenComponent;
  let fixture: ComponentFixture<HomeUkBlogOnehundredThirtysevenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogOnehundredThirtysevenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogOnehundredThirtysevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
