import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogOnehundredSixtysevenComponent } from './home-en-blog-onehundred-sixtyseven.component';

describe('HomeEnBlogOnehundredSixtysevenComponent', () => {
  let component: HomeEnBlogOnehundredSixtysevenComponent;
  let fixture: ComponentFixture<HomeEnBlogOnehundredSixtysevenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogOnehundredSixtysevenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogOnehundredSixtysevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
