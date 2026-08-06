import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogOnehundredSixtyeightComponent } from './home-en-blog-onehundred-sixtyeight.component';

describe('HomeEnBlogOnehundredSixtyeightComponent', () => {
  let component: HomeEnBlogOnehundredSixtyeightComponent;
  let fixture: ComponentFixture<HomeEnBlogOnehundredSixtyeightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogOnehundredSixtyeightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogOnehundredSixtyeightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
