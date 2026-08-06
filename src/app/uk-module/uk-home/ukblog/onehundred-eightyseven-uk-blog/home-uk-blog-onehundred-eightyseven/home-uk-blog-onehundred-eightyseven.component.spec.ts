import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogOnehundredEightysevenComponent } from './home-uk-blog-onehundred-eightyseven.component';

describe('HomeUkBlogOnehundredEightysevenComponent', () => {
  let component: HomeUkBlogOnehundredEightysevenComponent;
  let fixture: ComponentFixture<HomeUkBlogOnehundredEightysevenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogOnehundredEightysevenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogOnehundredEightysevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
