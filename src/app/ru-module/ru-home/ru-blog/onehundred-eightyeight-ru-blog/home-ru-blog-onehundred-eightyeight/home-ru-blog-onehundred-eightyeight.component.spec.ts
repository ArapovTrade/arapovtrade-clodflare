import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogOnehundredEightyeightComponent } from './home-ru-blog-onehundred-eightyeight.component';

describe('HomeRuBlogOnehundredEightyeightComponent', () => {
  let component: HomeRuBlogOnehundredEightyeightComponent;
  let fixture: ComponentFixture<HomeRuBlogOnehundredEightyeightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogOnehundredEightyeightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogOnehundredEightyeightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
