import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogOnehundredSixtysevenComponent } from './home-ru-blog-onehundred-sixtyseven.component';

describe('HomeRuBlogOnehundredSixtysevenComponent', () => {
  let component: HomeRuBlogOnehundredSixtysevenComponent;
  let fixture: ComponentFixture<HomeRuBlogOnehundredSixtysevenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogOnehundredSixtysevenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogOnehundredSixtysevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
