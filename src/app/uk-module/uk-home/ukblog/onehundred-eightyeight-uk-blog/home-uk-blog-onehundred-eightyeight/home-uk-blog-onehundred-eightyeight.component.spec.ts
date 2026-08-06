import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogOnehundredEightyeightComponent } from './home-uk-blog-onehundred-eightyeight.component';

describe('HomeUkBlogOnehundredEightyeightComponent', () => {
  let component: HomeUkBlogOnehundredEightyeightComponent;
  let fixture: ComponentFixture<HomeUkBlogOnehundredEightyeightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogOnehundredEightyeightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogOnehundredEightyeightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
