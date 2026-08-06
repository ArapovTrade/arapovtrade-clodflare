import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogOnehundredSixtysevenComponent } from './home-uk-blog-onehundred-sixtyseven.component';

describe('HomeUkBlogOnehundredSixtysevenComponent', () => {
  let component: HomeUkBlogOnehundredSixtysevenComponent;
  let fixture: ComponentFixture<HomeUkBlogOnehundredSixtysevenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogOnehundredSixtysevenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogOnehundredSixtysevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
