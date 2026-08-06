import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogOnehundredThirtysevenComponent } from './home-en-blog-onehundred-thirtyseven.component';

describe('HomeEnBlogOnehundredThirtysevenComponent', () => {
  let component: HomeEnBlogOnehundredThirtysevenComponent;
  let fixture: ComponentFixture<HomeEnBlogOnehundredThirtysevenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogOnehundredThirtysevenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogOnehundredThirtysevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
